import {Injectable} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {AuthService} from '../auth/auth.service';
import {Config} from '../../config/config';
import {Observable, Subject} from 'rxjs';
import {IMessage} from '@stomp/stompjs';
import {MessageRouter} from './message-router.service';
import {MessageType} from '../../models/message-types';
import {Message} from '../../models/messages/message';
import {DialogsPreviewsResponse} from '../../models/messages/dialogs-previews-response';
import {ChatCommunicationMessage} from '../../models/messages/chat-communication-message';
import {User} from '../../models/user';
import {ConversationDataResponse} from '../../models/messages/conversation-data-response';
import {ConversationDataRequest} from '../../models/messages/conversation-data-request';
import {UserSearchResultResponse} from '../../models/messages/user-search-result-response';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {UserSearchRequest} from '../../models/messages/user-search-request';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private stompService: RxStompService,
              private authService: AuthService,
              private messageRouter: MessageRouter) {
    this.messageRouter.registerSubjects();
  }

  private markedAsReadSource = new Subject<ChatCommunicationMessage>();

  markedAsRead$ = this.markedAsReadSource.asObservable();

  initMessaging() {
    this.stompService.configure(this.updateConfigWithAccessToken());
    this.stompService.activate();
    this.listenForMessages().subscribe((resp) => {
      const message: Message = JSON.parse(resp.body);
      this.messageRouter.processMessage(message);
    });
  }

  getDialogsPreviews(): Subject<DialogsPreviewsResponse> {
    this.sendMessage({}, Config.MESSAGING_CONFIG.getDialogsPreviewsURL);
    return this.messageRouter.getMessageSubject(MessageType.DIALOGS_PREVIEWS_RESPONSE) as
      Subject<DialogsPreviewsResponse>;
  }

  getConversationData(request: ConversationDataRequest): Subject<ConversationDataResponse> {
    this.sendMessage(request, Config.MESSAGING_CONFIG.getMessagesURL);
    return this.messageRouter.getMessageSubject(MessageType.CONVERSATION_DATA_RESPONSE) as
      Subject<ConversationDataResponse>;
  }

  getChatMessages() {
    return this.messageRouter.getMessageSubject(MessageType.CHAT_COMMUNICATION) as
      Subject<ChatCommunicationMessage>;
  }

  sendChatCommunicationMessage(messageText: string, receiver: User): void {
    const message = new ChatCommunicationMessage();
    message.messageText = messageText;
    message.receiver = receiver;
    this.sendMessage(message, Config.MESSAGING_CONFIG.chatCommunicationUrl);
  }

  markAsRead(message: ChatCommunicationMessage) {
    this.sendMessage([message.messageId], Config.MESSAGING_CONFIG.markAsReadUrl);
    this.markedAsReadSource.next(message);
  }

  searchForUsers(namePattern: Observable<string>): Observable<UserSearchResultResponse> {
    return namePattern.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (searchTerm.trim().length) {
          const userSearchRequest = new UserSearchRequest();
          userSearchRequest.namePattern = searchTerm;
          this.sendMessage(userSearchRequest, Config.MESSAGING_CONFIG.searchForUsersUrl);
        }
        return this.messageRouter.getMessageSubject(MessageType.USER_SEARCH_RESULT_RESPONSE) as
          Subject<UserSearchResultResponse>;
      })
    );
  }

  private listenForMessages(): Observable<IMessage> {
    return this.stompService.watch(Config.MESSAGING_CONFIG.listenForMessagesURL);
  }

  private sendMessage(message, path: string): void {
    this.stompService.publish({
      destination: path,
      body: JSON.stringify(message)
    });
  }

  /**
   * Adds JWT token to web socket server URL
   */
  private updateConfigWithAccessToken(): InjectableRxStompConfig {
    const stompConfig: InjectableRxStompConfig = {};
    Object.assign(stompConfig, Config.WS_CONFIG);
    stompConfig.brokerURL += `?access_token=${this.authService.getAccessToken()}`;
    return stompConfig;
  }

}

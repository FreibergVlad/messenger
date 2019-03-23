import {Injectable} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {AuthService} from '../auth/auth.service';
import {Config} from '../../config/config';
import {Observable} from 'rxjs';
import {IMessage, StompHeaders} from '@stomp/stompjs';
import {Message, MessageType} from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private stompService: RxStompService,
              private authService: AuthService) { }

  initMessaging() {
    this.stompService.configure(this.updateConfigWithAccessToken());
    this.stompService.activate();
  }

  getDialogsList(): Observable<IMessage> {
    return this.subscribe(Config.MESSAGING_CONFIG.getContactsListURL);
  }

  getMessagesByConversationId(conversationId: number): Observable<IMessage> {
    const headers: StompHeaders = {};
    headers.conversationId = conversationId.toString();
    return this.subscribe(Config.MESSAGING_CONFIG.getMessagesURL, headers);
  }

  sendChatCommunicationMessage(messageText: string, receiverUsername: string): void {
    const message = new Message();
    message.senderUsername = this.authService.getUsername();
    message.receiverUsername = receiverUsername;
    message.messageText = messageText;
    message.messageType = MessageType.CHAT_COMMUNICATION;
    this.sendMessage(message);
  }

  sendMessage(message: Message): void {
    this.stompService.publish({
      destination: Config.MESSAGING_CONFIG.chatCommunicationUrl,
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

  /**
   * Wrapper around {@link stompService#watch},
   * adds JWT access token to each request
   */
  private subscribe(destination: string, headers: StompHeaders = {}): Observable<IMessage> {
    headers.access_token = this.authService.getAccessToken();
    return this.stompService.watch(destination, headers);
  }

}

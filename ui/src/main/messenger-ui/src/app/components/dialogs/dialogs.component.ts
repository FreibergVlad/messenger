import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {DialogPreview} from '../../models/dialog-preview';
import {MessagingService} from '../../services/messaging/messaging.service';
import {ActivatedRoute} from '@angular/router';
import {MessagesComponent} from '../messages/messages.component';
import {Location} from '@angular/common';
import {Capabilities} from '../../services/utils/capabilities';
import {ChatCommunicationMessage} from '../../models/messages/chat-communication-message';
import {User} from '../../models/user';
import {UserSearchComponent} from '../user-search/user-search.component';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogsComponent implements OnInit, AfterViewInit {

  dialogsList: DialogPreview[] = [];
  searchResults: DialogPreview[] = [];
  selectedTabId?: string = null;

  isMobile = false;

  @ViewChild(MessagesComponent)
  messagesComponent: MessagesComponent;

  @ViewChild(UserSearchComponent)
  userSearchComponent: UserSearchComponent;

  constructor(private authService: AuthService,
              private messagingService: MessagingService,
              private location: Location,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isMobile = Capabilities.isMobile();
    this.location.subscribe((params) => {
      this.onURLPopState(params);
    });
    this.messagingService.getDialogsPreviews().subscribe(response => {
      this.dialogsList = response.dialogPreviews;
    });
    this.messagingService.getChatMessages().subscribe(message => {
      this.onMessageReceived(message);
    });
    this.messagingService.markedAsRead$.subscribe((message: ChatCommunicationMessage) => {
      this.getDialogByUsername(message.sender.username).unreadCount--;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const currentDialog = this.getConversationIdFromActivatedRoute();
      if (currentDialog) {
        this.changeDialog(currentDialog);
      }
    });
  }

  onMessageSent(message: string) {
    if (this.selectedTabId) {
      const receiverTab: DialogPreview = this.getCurrentDialog();
      let receiverUser: User;
      if (!receiverTab) {
        // Here we know that message was sent to user outside of contact list
        const newContact = this.searchResults.find(user => user.contact.userId === this.selectedTabId);
        this.dialogsList.push(new DialogPreview(newContact.contact));
        receiverUser = newContact.contact;
      } else {
        receiverUser = receiverTab.contact;
      }
      if (receiverUser) {
        this.messagingService.sendChatCommunicationMessage(message, receiverUser);
      }
    }
  }

  onMessageReceived(message: ChatCommunicationMessage) {
    const currentDialog = this.getCurrentDialog();
    const targetDialog = this.getDialogByUsername(message.sender.username);
    if (this.isAcknowledgeMessage(message)) {
      this.messagesComponent.onMessageReceived(message);
    } else if (!targetDialog) {
      this.messageFromNewContactReceived(message);
    } else if (!currentDialog) {
      if (this.authService.getUsername() !== message.sender.username) {
        targetDialog.lastMessage = message;
        targetDialog.unreadCount++;
      }
    } else if (currentDialog.contact.username === message.sender.username) {
      this.messagesComponent.onMessageReceived(message);
      currentDialog.lastMessage = message;
    } else {
      targetDialog.unreadCount++;
      targetDialog.lastMessage = message;
    }
  }

  searchResultReceived(userList: User[]): void {
    this.searchResults = userList.map(user => new DialogPreview(user));
  }

  changeDialog(tabId?: string): void {
    this.selectedTabId = tabId;
  }

  /**
   * Processes messages that were received from new users (users outside of contact list)
   */
  private messageFromNewContactReceived(message: ChatCommunicationMessage): void {
    const newDialogTab = new DialogPreview(message.sender, message, 1);
    this.dialogsList.push(newDialogTab);
  }

  /**
   * We need to refresh current tab in case when
   * user changes browsing history
   */
  private onURLPopState(params): void {
    const match: RegExpMatchArray = params.url.match(/\/dialogs\/\(conversation:(\d)\)/);
    if (Array.isArray(match) && match[1]) {
      this.changeDialog(match[1]);
    } else {
      this.changeDialog(null);
    }
  }

  private getConversationIdFromActivatedRoute(): string {
    return this.route.firstChild && this.route.firstChild.snapshot.params.conversationId;
  }

  private isAcknowledgeMessage(message: ChatCommunicationMessage): boolean {
    const currentDialog = this.getCurrentDialog();
    if (currentDialog) {
      return this.authService.getUsername() === message.sender.username
        && currentDialog.contact.username === message.receiver.username;
    }
    return false;
  }

  private getCurrentDialog(): DialogPreview {
    return this.dialogsList.find((dialog) => dialog.contact.userId === this.selectedTabId);
  }

  private getDialogByUsername(username: string): DialogPreview {
    return this.dialogsList.find((dialog) => dialog.contact.username === username);
  }

}

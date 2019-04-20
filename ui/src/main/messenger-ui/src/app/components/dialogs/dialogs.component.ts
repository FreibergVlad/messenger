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

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogsComponent implements OnInit, AfterViewInit {

  dialogsList: DialogPreview[] = [];
  selectedTabId?: string = null;

  isMobile = false;

  @ViewChild(MessagesComponent)
  messagesComponent: MessagesComponent;

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
      const receiver: User = this.getCurrentDialog().contact;
      if (receiver) {
        this.messagingService.sendChatCommunicationMessage(message, receiver);
      }
    }
  }

  onMessageReceived(message: ChatCommunicationMessage) {
    const currentDialog = this.getCurrentDialog();
    const targetDialog = this.getDialogByUsername(message.sender.username);
    if (this.isAcknowledgeMessage(message)) {
      this.messagesComponent.onMessageReceived(message);
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

  changeDialog(tabId?: string): void {
    this.selectedTabId = tabId;
    const currentDialog = this.getCurrentDialog();
    if (currentDialog) {
      currentDialog.unreadCount = 0;
    }
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

import {
  AfterViewInit,
  Component,
  OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {DialogPreview} from '../../models/dialog-preview';
import {MessagingService} from '../../services/messaging/messaging.service';
import {ActivatedRoute} from '@angular/router';
import {Message} from '../../models/message';
import {MessagesComponent} from '../messages/messages.component';
import {Location} from '@angular/common';
import {Capabilities} from '../../services/utils/capabilities';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogsComponent implements OnInit, AfterViewInit {

  dialogsList: DialogPreview[] = [];
  selectedTabId?: number = null;

  private isMobile = false;

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
    this.messagingService.getDialogsList().subscribe((resp) => {
      this.dialogsList = JSON.parse(resp.body);
    });
    this.messagingService.listenForMessages().subscribe((resp) => {
      this.onMessageReceived(JSON.parse(resp.body));
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const currentDialog = this.getConversationIdFromActivatedRoute();
      if (currentDialog) {
        this.changeDialog(Number(currentDialog));
      }
    });
  }

  onMessageSent(message: string) {
    if (this.selectedTabId) {
      const receiverUsername: string = this.dialogsList
        .find(dialog => dialog.userId === this.selectedTabId).username;
      if (receiverUsername) {
        this.messagingService.sendChatCommunicationMessage(message, receiverUsername);
      }
    }
  }

  onMessageReceived(message: Message) {
    const currentDialog = this.getCurrentDialog();
    if (this.isAcknowledgeMessage(message)) {
      this.messagesComponent.onMessageReceived(message);
    } else if (currentDialog.username === message.senderUsername) {
      this.messagesComponent.onMessageReceived(message);
      currentDialog.lastMessage = message.messageText;
    } else {
      // TODO Handling of messages received for inactive conversations
    }
  }

  changeDialog(tabId: number): void {
    this.selectedTabId = tabId;
  }

  /**
   * We need to refresh current tab in case when
   * user changes browsing history
   */
  private onURLPopState(params): void {
    const match: RegExpMatchArray = params.url.match(/\/dialogs\/\(conversation:(\d)\)/);
    if (Array.isArray(match) && match[1] && !isNaN(Number(match[1]))) {
      this.selectedTabId = Number(match[1]);
    } else {
      this.selectedTabId = null;
    }
  }

  private getConversationIdFromActivatedRoute(): number {
    return this.route.firstChild && this.route.firstChild.snapshot.params.conversationId;
  }

  private isAcknowledgeMessage(message: Message): boolean {
    const currentDialog = this.getCurrentDialog();
    if (currentDialog) {
      return this.authService.getUsername() === message.senderUsername
        && currentDialog.username === message.receiverUsername;
    }
    return false;
  }

  private getCurrentDialog(): DialogPreview {
    return this.dialogsList.find((dialog) => dialog.userId === this.selectedTabId);
  }

}

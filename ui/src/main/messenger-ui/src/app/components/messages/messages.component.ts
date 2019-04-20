import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessagingService} from '../../services/messaging/messaging.service';
import {ScrollPanel} from 'primeng/primeng';
import {ChatCommunicationMessage} from '../../models/messages/chat-communication-message';
import {ConversationDataRequest} from '../../models/messages/conversation-data-request';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  conversationId?: string = null;
  messages: ChatCommunicationMessage[] = [];

  @ViewChild(ScrollPanel)
  scrollPanel: ScrollPanel;

  constructor(private route: ActivatedRoute,
              private messagingService: MessagingService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.conversationId = params.conversationId;
      const request = new ConversationDataRequest();
      request.contactId = this.conversationId;
      request.sort = 'timestamp';
      this.messagingService.getConversationData(request).subscribe(response => {
        this.messages = response.messages;
      });
    });
  }

  onMessageReceived(message: ChatCommunicationMessage) {
    this.messages.push(message);
  }

  scrollToEnd() {
    this.scrollPanel.scrollTop(this.scrollPanel.contentViewChild.nativeElement.scrollHeight);
  }

  /**
   * Returns true if messages[index] and messages[index - 1] were sent in
   * different days. If it's, then we need to insert the date separator
   */
  private isNewDay(index: number) {
    if (!this.messages[index - 1]) {
      return true;
    }
    const currentDate: string = new Date(this.messages[index].timestamp).toDateString();
    const previousDate: string = new Date(this.messages[index - 1].timestamp).toDateString();
    return  currentDate !== previousDate;
  }

  /**
   * Returns false if messages[index] and messages[index - 1] were sent by the different users,
   * or they were sent in different days. In that case we don't need to show user avatar and it's username
   *
   * @see isNewDay
   */
  private isShortMessageFormat(index: number) {
    if (this.isNewDay(index)) {
      return false;
    }
    const currentMessage = this.messages[index];
    const previousMessage = this.messages[index - 1];
    return currentMessage.sender.username === previousMessage.sender.username;
  }

}

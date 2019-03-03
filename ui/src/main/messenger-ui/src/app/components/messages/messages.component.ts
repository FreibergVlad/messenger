import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessagingService} from '../../services/messaging/messaging.service';
import {Message} from '../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  conversationId?: number = null;
  messages: Message[] = [];

  constructor(private route: ActivatedRoute,
              private messagingService: MessagingService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.conversationId = +params.conversationId;
      this.messages = this.messagingService.getMessagesByConversationId(this.conversationId);
    });
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

}

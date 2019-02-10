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

}

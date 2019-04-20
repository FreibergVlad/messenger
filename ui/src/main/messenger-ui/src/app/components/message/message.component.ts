import {Component, Input, OnInit} from '@angular/core';
import {ChatCommunicationMessage} from '../../models/messages/chat-communication-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: ChatCommunicationMessage;
  @Input() isNewDay: false;
  @Input() isShortFormat: false;

  constructor() { }

  ngOnInit() {
  }

}

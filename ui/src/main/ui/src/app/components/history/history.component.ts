import {Component, Input, OnInit} from '@angular/core';
import {Message, StompService} from "../../services/stomp/stomp.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [StompService]
})
export class HistoryComponent implements OnInit {

  @Input() dialog: Number;
  messages: Array<Message>;

  constructor(private stompService: StompService) { }

  ngOnInit() {
    this.messages = this.stompService.getMessageHistory(this.dialog);
  }

  private getMsgFormat() {
    return MessageFormat.SHORT;
  }
}

export enum MessageFormat{
  SHORT = 'SHORT',
  LONG = 'LONG'
}

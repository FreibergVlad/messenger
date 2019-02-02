import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../services/stomp/stomp.service";
import {MessageFormat} from "../history/history.component";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @Input() msgFormat: MessageFormat;

  constructor() { }

  ngOnInit() {
  }

}

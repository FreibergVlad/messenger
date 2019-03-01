import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BottomPanelComponent implements OnInit {

  messageText = '';
  @Output() messageSent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    const message = this.messageText.trim();
    if (message) {
      this.messageSent.emit(message);
      this.messageText = '';
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === ENTER && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

}

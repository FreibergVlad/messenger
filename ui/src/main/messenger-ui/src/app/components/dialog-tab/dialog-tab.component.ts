import {Component, Input, OnInit} from '@angular/core';
import {DialogPreview} from '../../models/dialog-preview';

@Component({
  selector: 'app-dialog-tab',
  templateUrl: './dialog-tab.component.html',
  styleUrls: ['./dialog-tab.component.css'],
})
export class DialogTabComponent implements OnInit {

  @Input() dialogPreview: DialogPreview;
  colors: Array<string> = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  constructor() { }

  ngOnInit() {
  }

  getAvatarColor(messageSender) {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    return this.colors[Math.abs(hash % this.colors.length)];
  }

}

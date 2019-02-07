import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-tab',
  templateUrl: './dialog-tab.component.html',
  styleUrls: ['./dialog-tab.component.css'],
})
export class DialogTabComponent implements OnInit {

  @Input() tabId: number;
  @Input() name: string;
  @Input() lastMessage: string;

  constructor() { }

  ngOnInit() {
  }

}

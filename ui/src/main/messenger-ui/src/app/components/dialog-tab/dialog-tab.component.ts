import {Component, Input, OnInit} from '@angular/core';
import {DialogPreview} from '../../models/dialog-preview';

@Component({
  selector: 'app-dialog-tab',
  templateUrl: './dialog-tab.component.html',
  styleUrls: ['./dialog-tab.component.css'],
})
export class DialogTabComponent implements OnInit {

  @Input() dialogPreview: DialogPreview;

  constructor() { }

  ngOnInit() {
  }

}

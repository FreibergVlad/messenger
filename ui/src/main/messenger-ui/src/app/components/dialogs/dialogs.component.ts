import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {DialogPreview} from '../../models/dialog-preview';
import {MessagingService} from '../../services/messaging/messaging.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogsComponent implements OnInit {

  dialogsList: Array<DialogPreview>;
  selectedTabId?: number = null;

  constructor(private authService: AuthService,
              private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.dialogsList = this.messagingService.getDialogsList();
  }

  changeDialog(tabId: number): void {
    this.selectedTabId = tabId;
  }

}

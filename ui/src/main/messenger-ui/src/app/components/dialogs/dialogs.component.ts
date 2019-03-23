import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {DialogPreview} from '../../models/dialog-preview';
import {MessagingService} from '../../services/messaging/messaging.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogsComponent implements OnInit, AfterViewInit {

  dialogsList: DialogPreview[] = [];
  selectedTabId?: number = null;

  constructor(private authService: AuthService,
              private messagingService: MessagingService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.messagingService.getDialogsList().subscribe((resp) => {
      this.dialogsList = JSON.parse(resp.body);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const currentDialog = this.getConversationIdFromUrl();
      if (currentDialog) {
        this.changeDialog(Number(currentDialog));
      }
    });
  }

  onMessageSent(message: string) {
    if (this.selectedTabId) {
      const receiverUsername: string = this.dialogsList
        .find(dialog => dialog.userId === this.selectedTabId).username;
      if (receiverUsername) {
        this.messagingService.sendChatCommunicationMessage(message, receiverUsername);
      }
    }
  }

  changeDialog(tabId: number): void {
    this.selectedTabId = tabId;
  }

  private getConversationIdFromUrl(): number {
    return this.route.firstChild && this.route.firstChild.snapshot.params.conversationId;
  }
}

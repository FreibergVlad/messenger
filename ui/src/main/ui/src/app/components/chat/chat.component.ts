import { Component, OnInit } from '@angular/core';
import {StompService, User} from '../../services/stomp/stomp.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [StompService, AuthService]
})
export class ChatComponent implements OnInit {

    constructor(
      private stompService: StompService,
      private authService: AuthService
    ) { }

    currentDialog: Number = null;
    participants: Array<User> = this.stompService.getDialogs();

    changeDialog = userID => this.currentDialog = userID;

    ngOnInit(): void {
    }

    logout(): void {
      this.authService.logout();
    }

}

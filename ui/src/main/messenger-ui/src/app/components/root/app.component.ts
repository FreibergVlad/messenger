import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MessagingService} from '../../services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.authService.obtainAccessToken().then(() => {
      this.messagingService.initMessaging();
    });
  }

}

import { Injectable } from '@angular/core';
import {Message} from '../../models/message';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {AuthService} from '../auth/auth.service';
import {Config} from '../../config/config';
import {Observable} from 'rxjs';
import {IMessage} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  mockedMessages: Message[] = [new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now())
  , new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now()),
    new Message('Vlad', 'Some message', Date.now()), new Message('Vlad', 'Some message', Date.now())];

  constructor(private stompService: RxStompService,
              private authService: AuthService) { }

  initMessaging() {
    this.stompService.configure(this.updateConfigWithAccessToken());
    this.stompService.activate();
  }

  getDialogsList(): Observable<IMessage> {
    return this.subscribe(Config.MESSAGING_CONFIG.getContactsListURL);
  }

  getMessagesByConversationId(conversationId: number): Message[] {
    return this.mockedMessages;
  }

  /**
   * Adds JWT token to web socket server URL
   */
  private updateConfigWithAccessToken(): InjectableRxStompConfig {
    const stompConfig: InjectableRxStompConfig = {};
    Object.assign(stompConfig, Config.WS_CONFIG);
    stompConfig.brokerURL += `?access_token=${this.authService.getAccessToken()}`;
    return stompConfig;
  }

  /**
   * Wrapper around {@link stompService#watch},
   * adds JWT access token to each request
   */
  private subscribe(destination: string): Observable<IMessage> {
    return this.stompService.watch(destination, {
      access_token: this.authService.getAccessToken()
    });
  }

}

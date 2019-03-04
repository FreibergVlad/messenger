import { Injectable } from '@angular/core';
import {DialogPreview} from '../../models/dialog-preview';
import {Message} from '../../models/message';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {AuthService} from '../auth/auth.service';
import {Config} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  mockedDialogs: DialogPreview[] = [new DialogPreview(1, 'Vlad', 'Some message'),
    new DialogPreview(2, 'Vlad', 'Some message'), new DialogPreview(3, 'Vlad', 'Some message')
    , new DialogPreview(4, 'Vlad', 'Some message')];

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

  getDialogsList(): DialogPreview[] {
    return this.mockedDialogs;
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

}

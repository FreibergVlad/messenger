import { Injectable } from '@angular/core';
import {DialogPreview} from '../../models/dialog-preview';
import {Message} from '../../models/message';

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

  constructor() { }

  getDialogsList(): DialogPreview[] {
    return this.mockedDialogs;
  }

  getMessagesByConversationId(conversationId: number): Message[] {
    return this.mockedMessages;
  }

}

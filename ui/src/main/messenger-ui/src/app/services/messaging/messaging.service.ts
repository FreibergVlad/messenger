import { Injectable } from '@angular/core';
import {DialogPreview} from '../../models/dialog-preview';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  mockedDialogs: Array<DialogPreview> = [new DialogPreview(1, 'Vlad', 'Some message'),
    new DialogPreview(2, 'Vlad', 'Some message'), new DialogPreview(3, 'Vlad', 'Some message')
    , new DialogPreview(4, 'Vlad', 'Some message')];

  constructor() { }

  getDialogsList(): Array<DialogPreview> {
    return this.mockedDialogs;
  }

}

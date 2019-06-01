import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MessageType} from '../../models/message-types';
import {Message} from '../../models/messages/message';

@Injectable({
  providedIn: 'root'
})
export class MessageRouter {

  messageSubjects: Map<string, Subject<Message>> = new Map();

  constructor() { }

  registerSubjects() {
    this.messageSubjects.set(MessageType.DIALOGS_PREVIEWS_RESPONSE.toString(), new Subject());
    this.messageSubjects.set(MessageType.CONVERSATION_DATA_RESPONSE.toString(), new Subject());
    this.messageSubjects.set(MessageType.CHAT_COMMUNICATION.toString(), new Subject());
    this.messageSubjects.set(MessageType.USER_SEARCH_RESULT_RESPONSE.toString(), new Subject());
  }

  getMessageSubject(messageType: string): Subject<Message> {
    return this.messageSubjects.get(messageType);
  }

  processMessage(message: Message): void {
    const messageSubject = this.getMessageSubject(message.messageType);
    if (messageSubject) {
      messageSubject.next(message);
    }
  }

}

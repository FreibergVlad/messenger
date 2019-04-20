import {User} from './user';
import {ChatCommunicationMessage} from './messages/chat-communication-message';

export class DialogPreview {

  contact: User;
  lastMessage: ChatCommunicationMessage;
  unreadCount: number;

  constructor(contact, lastMessage, unreadCount = 0) {
    this.contact = contact;
    this.lastMessage = lastMessage;
    this.unreadCount = unreadCount;
  }

}

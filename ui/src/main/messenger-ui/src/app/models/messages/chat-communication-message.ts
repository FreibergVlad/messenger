import {Message} from './message';
import {MessageType} from '../message-types';
import {User} from '../user';

export class ChatCommunicationMessage extends Message {

  sender: User;
  receiver: User;
  messageText: string;
  timestamp: number;
  markedAsRead: boolean;

  get messageType(): MessageType {
    return MessageType.CHAT_COMMUNICATION;
  }

}

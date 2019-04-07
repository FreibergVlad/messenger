import {Message} from './message';

export class DialogPreview {

  userId: number;
  username: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;

  constructor(userId, username, lastMessage, timestamp, unreadCount = 0) {
    this.userId = userId;
    this.username = username;
    this.lastMessage = lastMessage;
    this.timestamp = timestamp;
    this.unreadCount = unreadCount;
  }

  public updateWithMessage(message: Message) {
    this.lastMessage = message.messageText;
    this.timestamp = message.timestamp;
  }

}

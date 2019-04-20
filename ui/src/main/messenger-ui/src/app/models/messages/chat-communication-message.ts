import {Message} from './message';
import {MessageType} from './message-types';

export class ChatCommunicationMessage extends Message {

  senderUsername: string;
  receiverUsername: string;
  messageText: string;
  timestamp: number;

  constructor(senderUsername = null, receiverUsername = null, messageText = null, timestamp = null) {
    super();
    this.senderUsername = senderUsername;
    this.receiverUsername = receiverUsername;
    this.messageText = messageText;
    this.timestamp = timestamp;
  }

  get messageType(): MessageType {
    return MessageType.CHAT_COMMUNICATION;
  }

}

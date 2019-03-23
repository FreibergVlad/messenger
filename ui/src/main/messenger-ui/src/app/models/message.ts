export class Message {

  senderUsername: string;
  receiverUsername: string;
  messageText: string;
  timestamp: number;
  messageType: MessageType;

  constructor(senderUsername = null, receiverUsername = null, messageText = null, timestamp = null) {
    this.senderUsername = senderUsername;
    this.receiverUsername = receiverUsername;
    this.messageText = messageText;
    this.timestamp = timestamp;
  }

}

export enum MessageType {
  CHAT_ACTIVITY,
  CHAT_COMMUNICATION,
}

export class Message {

  senderUsername: string;
  messageText: string;
  timestamp: number;

  constructor(senderUsername, messageText, timestamp) {
    this.senderUsername = senderUsername;
    this.messageText = messageText;
    this.timestamp = timestamp;
  }

}

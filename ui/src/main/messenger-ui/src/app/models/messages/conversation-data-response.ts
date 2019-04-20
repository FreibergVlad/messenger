import {Message} from './message';
import {MessageType} from '../message-types';
import {ChatCommunicationMessage} from './chat-communication-message';

export class ConversationDataResponse extends Message {

  messages: ChatCommunicationMessage[];

  get messageType(): MessageType {
    return MessageType.CONVERSATION_DATA_RESPONSE;
  }

}

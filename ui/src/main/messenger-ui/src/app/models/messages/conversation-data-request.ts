import {Message} from './message';
import {MessageType} from '../message-types';

export class ConversationDataRequest extends Message {

  contactId: string;

  page: number;
  limit: number;
  sort: string;

  get messageType(): MessageType {
    return MessageType.CONVERSATION_DATA_REQUEST;
  }

}

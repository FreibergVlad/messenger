import {MessageType} from '../message-types';
import {PageableRequest} from './pageable-request';

export class ConversationDataRequest extends PageableRequest {

  contactId: string;

  get messageType(): MessageType {
    return MessageType.CONVERSATION_DATA_REQUEST;
  }

}

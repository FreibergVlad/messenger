import {MessageType} from '../message-types';
import {PageableRequest} from './pageable-request';

export class UserSearchRequest extends PageableRequest {

  namePattern: string;

  get messageType(): MessageType {
    return MessageType.USER_SEARCH_REQUEST;
  }
}

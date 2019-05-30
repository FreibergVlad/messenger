import {Message} from './message';
import {MessageType} from '../message-types';
import {User} from '../user';

export class UserSearchResultResponse extends Message {

  contactsList: User[];

  get messageType(): MessageType {
    return MessageType.USER_SEARCH_RESULT_RESPONSE;
  }

}

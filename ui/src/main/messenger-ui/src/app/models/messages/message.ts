import {MessageType} from './message-types';

export abstract class Message {

  messageId: string;

  abstract get messageType(): MessageType;

}

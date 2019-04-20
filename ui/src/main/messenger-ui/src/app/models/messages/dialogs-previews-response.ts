import {Message} from './message';
import {MessageType} from './message-types';
import {DialogPreview} from './dialog-preview';

export class DialogsPreviewsResponse extends Message {

  dialogPreviews: DialogPreview[];

  get messageType(): MessageType {
    return MessageType.DIALOGS_PREVIEWS_RESPONSE;
  }

}

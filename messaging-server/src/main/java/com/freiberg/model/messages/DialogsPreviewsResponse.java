package com.freiberg.model.messages;

import com.freiberg.model.DialogPreview;
import com.freiberg.model.MessageType;
import com.freiberg.model.messages.AbstractMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DialogsPreviewsResponse extends AbstractMessage {

    private Collection<DialogPreview> dialogPreviews;

    @Override
    public MessageType getMessageType() {
        return MessageType.DIALOGS_PREVIEWS_RESPONSE;
    }
}

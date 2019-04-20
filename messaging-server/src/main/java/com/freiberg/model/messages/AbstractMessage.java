package com.freiberg.model.messages;

import com.freiberg.model.MessageType;
import lombok.Data;
import utils.UniqueID;

@Data
public abstract class AbstractMessage {

    protected String messageId;

    AbstractMessage() {
        this.messageId = UniqueID.getUniqueId();
    }

    public abstract MessageType getMessageType();
}

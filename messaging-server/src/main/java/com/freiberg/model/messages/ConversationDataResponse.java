package com.freiberg.model.messages;

import com.freiberg.model.MessageDTO;
import com.freiberg.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class ConversationDataResponse extends AbstractMessage {

    Collection<MessageDTO> messages;

    @Override
    public MessageType getMessageType() {
        return MessageType.CONVERSATION_DATA_RESPONSE;
    }
}

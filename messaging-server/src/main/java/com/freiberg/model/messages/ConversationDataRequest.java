package com.freiberg.model.messages;

import com.freiberg.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDataRequest extends PageableRequest {

    private String contactId;

    @Override
    public MessageType getMessageType() {
        return MessageType.CONVERSATION_DATA_REQUEST;
    }
}

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
public class UserSearchRequest extends PageableRequest {

    private String namePattern;

    @Override
    public MessageType getMessageType() {
        return MessageType.USER_SEARCH_REQUEST;
    }
}

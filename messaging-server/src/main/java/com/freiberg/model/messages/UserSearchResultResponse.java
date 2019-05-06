package com.freiberg.model.messages;

import com.freiberg.model.MessageType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import model.UserDTO;

import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserSearchResultResponse extends ContactsResponse {

    public UserSearchResultResponse(Collection<UserDTO> contactsList) {
        super(contactsList);
    }

    @Override
    public MessageType getMessageType() {
        return MessageType.USER_SEARCH_RESULT_RESPONSE;
    }
}

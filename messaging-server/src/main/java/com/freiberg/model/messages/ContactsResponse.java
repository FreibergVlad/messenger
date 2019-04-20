package com.freiberg.model.messages;

import com.freiberg.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import model.UserDTO;

import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactsResponse extends AbstractMessage {

    private Collection<UserDTO> contactsList;

    @Override
    public MessageType getMessageType() {
        return MessageType.CONTACTS_RESPONSE;
    }
}

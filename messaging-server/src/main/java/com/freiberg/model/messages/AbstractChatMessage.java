package com.freiberg.model.messages;

import lombok.Data;
import lombok.EqualsAndHashCode;
import model.User;

@EqualsAndHashCode(callSuper = true)
@Data
public abstract class AbstractChatMessage extends AbstractMessage {

    public User sender;
    public User receiver;

}

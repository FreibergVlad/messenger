package com.freiberg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.UserDTO;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DialogPreview {

    private UserDTO contact;
    private MessageDTO lastMessage;
    private long unreadCount;

}

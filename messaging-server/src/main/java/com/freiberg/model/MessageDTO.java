package com.freiberg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.UserDTO;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {

    private String messageId;
    private UserDTO sender;
    private UserDTO receiver;
    private Date timestamp;
    private String messageText;
    private boolean markedAsRead;
    private MessageType messageType;

}

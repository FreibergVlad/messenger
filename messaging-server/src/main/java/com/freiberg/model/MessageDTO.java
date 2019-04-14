package com.freiberg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {

    private String messageId;
    private String senderUsername;
    private String receiverUsername;
    private Date timestamp;
    private String messageText;
    private MessageType messageType;

}

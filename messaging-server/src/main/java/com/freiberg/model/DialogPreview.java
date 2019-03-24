package com.freiberg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DialogPreview {

    private long userId;
    private String username;
    private String lastMessage;
    private Date timestamp;

}

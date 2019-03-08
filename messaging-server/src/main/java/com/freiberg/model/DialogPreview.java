package com.freiberg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DialogPreview {

    private long userId;
    private String username;
    private String lastMessage;

}
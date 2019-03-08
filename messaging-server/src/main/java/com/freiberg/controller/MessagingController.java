package com.freiberg.controller;

import com.freiberg.model.DialogPreview;
import com.freiberg.service.MessagingService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;

@Controller
@NoArgsConstructor
@Data
public class MessagingController {

    private MessagingService messagingService;

    @MessageMapping("/getContacts")
    public List<DialogPreview> getContacts(Principal principal) {
        return messagingService.getContacts(principal);
    }
}

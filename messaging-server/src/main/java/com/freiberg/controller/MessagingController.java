package com.freiberg.controller;

import com.freiberg.model.DialogPreview;
import com.freiberg.model.Message;
import com.freiberg.service.MessagingService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;

@Controller
@AllArgsConstructor
public class MessagingController {

    private MessagingService messagingService;

    @SubscribeMapping("/contacts")
    public List<DialogPreview> getContacts(Principal principal) {
        return messagingService.getContacts(principal);
    }

    @SubscribeMapping("/messages")
    public List<Message> getMessages(Principal principal, SimpMessageHeaderAccessor headerAccessor) {
        return messagingService.getMessagesByUserId(principal, headerAccessor);
    }
}

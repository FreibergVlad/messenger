package com.freiberg.controller;

import com.freiberg.model.DialogPreview;
import com.freiberg.model.MessageDTO;
import com.freiberg.service.MessagingService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
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
    public List<MessageDTO> getMessages(@Header(name = "conversationId") Long conversationId, Principal principal) throws Exception {
        return messagingService.handleConversationDataRequest(principal, conversationId);
    }

    @MessageMapping("/chat.communication")
    public void sendMessage(Principal principal, MessageDTO message) throws Exception {
        messagingService.handleChatCommunicationMessage(principal, message);
    }
}

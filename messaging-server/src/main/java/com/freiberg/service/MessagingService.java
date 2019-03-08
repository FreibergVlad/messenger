package com.freiberg.service;

import com.freiberg.model.DialogPreview;
import com.freiberg.model.Message;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import java.security.Principal;
import java.util.List;

public interface MessagingService {

    List<DialogPreview> getContacts(Principal principal);

    List<Message> getMessagesByUserId(Principal principal, SimpMessageHeaderAccessor headerAccessor);
}

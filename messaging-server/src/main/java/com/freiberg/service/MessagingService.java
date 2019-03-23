package com.freiberg.service;

import com.freiberg.model.DialogPreview;
import com.freiberg.model.MessageDTO;

import java.security.Principal;
import java.util.List;

public interface MessagingService {

    List<DialogPreview> getContacts(Principal principal);

    List<MessageDTO> handleConversationDataRequest(Principal principal, Long conversationId) throws Exception;

    void handleChatCommunicationMessage(Principal principal, MessageDTO message) throws Exception;
}

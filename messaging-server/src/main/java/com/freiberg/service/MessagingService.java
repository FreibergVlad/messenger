package com.freiberg.service;

import com.freiberg.model.messages.ContactsResponse;
import com.freiberg.model.messages.ConversationDataRequest;
import com.freiberg.model.messages.ConversationDataResponse;
import com.freiberg.model.messages.DialogsPreviewsResponse;
import com.freiberg.model.MessageDTO;

import java.security.Principal;

public interface MessagingService {

    ContactsResponse getContacts(Principal principal);

    DialogsPreviewsResponse getDialogsPreviews(Principal principal);

    ConversationDataResponse getMessages(Principal principal, ConversationDataRequest request) throws Exception;

    void handleChatCommunicationMessage(Principal principal, MessageDTO message) throws Exception;
}

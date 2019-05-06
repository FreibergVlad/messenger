package com.freiberg.service;

import com.freiberg.model.MessageDTO;
import com.freiberg.model.messages.ContactsResponse;
import com.freiberg.model.messages.ConversationDataRequest;
import com.freiberg.model.messages.ConversationDataResponse;
import com.freiberg.model.messages.DialogsPreviewsResponse;
import com.freiberg.model.messages.UserSearchRequest;
import com.freiberg.model.messages.UserSearchResultResponse;

import java.security.Principal;
import java.util.List;

public interface MessagingService {

    ContactsResponse getContacts(Principal principal);

    UserSearchResultResponse searchForUsers(Principal principal, UserSearchRequest userSearchRequest) throws Exception;

    DialogsPreviewsResponse getDialogsPreviews(Principal principal);

    ConversationDataResponse getMessages(Principal principal, ConversationDataRequest request) throws Exception;

    void handleChatCommunicationMessage(Principal principal, MessageDTO message) throws Exception;

    void markAsRead(Principal principal, List<String> messageIds) throws Exception;
}

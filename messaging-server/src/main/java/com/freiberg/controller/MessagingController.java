package com.freiberg.controller;

import com.freiberg.model.MessageDTO;
import com.freiberg.model.messages.ContactsResponse;
import com.freiberg.model.messages.ConversationDataRequest;
import com.freiberg.model.messages.ConversationDataResponse;
import com.freiberg.model.messages.DialogsPreviewsResponse;
import com.freiberg.model.messages.UserSearchRequest;
import com.freiberg.model.messages.UserSearchResultResponse;
import com.freiberg.service.MessagingService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;

@Controller
@AllArgsConstructor
public class MessagingController {

    private static final String SUBSCRIPTION_PATH = "/queue/messages";

    private MessagingService messagingService;

    @MessageMapping("/getContacts")
    @SendToUser(SUBSCRIPTION_PATH)
    public ContactsResponse getContacts(Principal principal) {
        return messagingService.getContacts(principal);
    }

    @MessageMapping("/getDialogsPreview")
    @SendToUser(SUBSCRIPTION_PATH)
    public DialogsPreviewsResponse getDialogsPreviews(Principal principal) {
        return messagingService.getDialogsPreviews(principal);
    }

    @MessageMapping("/getMessageHistory")
    @SendToUser(SUBSCRIPTION_PATH)
    public ConversationDataResponse getMessages(Principal principal, ConversationDataRequest request) throws Exception {
        return messagingService.getMessages(principal, request);
    }

    @MessageMapping("/searchForUsers")
    @SendToUser(SUBSCRIPTION_PATH)
    public UserSearchResultResponse searchForUsers(
            Principal principal,
            UserSearchRequest userSearchRequest
    ) throws Exception {
        return messagingService.searchForUsers(principal, userSearchRequest);
    }

    @MessageMapping("/sendMessage")
    public void sendChatCommunicationMessage(Principal principal, MessageDTO message) throws Exception {
        messagingService.handleChatCommunicationMessage(principal, message);
    }

    @MessageMapping("/markAsRead")
    public void markAsRead(Principal principal, List<String> messageIds) throws Exception {
        messagingService.markAsRead(principal, messageIds);
    }
}

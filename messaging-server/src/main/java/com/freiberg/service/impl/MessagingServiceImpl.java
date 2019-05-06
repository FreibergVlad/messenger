package com.freiberg.service.impl;

import com.freiberg.connection.ConnectionManager;
import com.freiberg.dao.MessageDao;
import com.freiberg.model.DialogPreview;
import com.freiberg.model.MessageDTO;
import com.freiberg.model.messages.ContactsResponse;
import com.freiberg.model.messages.ConversationDataRequest;
import com.freiberg.model.messages.ConversationDataResponse;
import com.freiberg.model.messages.DialogsPreviewsResponse;
import com.freiberg.model.messages.Message;
import com.freiberg.model.messages.UserSearchRequest;
import com.freiberg.model.messages.UserSearchResultResponse;
import com.freiberg.service.MessagingService;
import com.freiberg.validator.RequestValidator;
import dao.UserDao;
import lombok.AllArgsConstructor;
import model.User;
import model.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

@Service
@AllArgsConstructor
public class MessagingServiceImpl implements MessagingService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private UserDao userDao;
    private MessageDao messageDao;

    private ConnectionManager connectionManager;

    private SimpMessageSendingOperations messagingTemplate;
    private RequestValidator requestValidator;

    @Override
    @Transactional
    public ContactsResponse getContacts(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        Set<User> contacts = user.getContacts();
        return new ContactsResponse(contacts.stream().map(User::toDto).collect(toSet()));
    }

    @Override
    @Transactional
    public UserSearchResultResponse searchForUsers(
            Principal principal,
            UserSearchRequest userSearchRequest
    ) throws Exception {
        requestValidator.checkAuthentication(principal);
        Collection<User> users = userDao.findByUsernameStartsWith(
                userSearchRequest.getNamePattern(),
                userSearchRequest.getPageRequest()
        );
        List<UserDTO> userDTOs = users.stream().map(User::toDto).collect(toList());
        return new UserSearchResultResponse(userDTOs);
    }

    @Override
    @Transactional
    public DialogsPreviewsResponse getDialogsPreviews(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        Set<User> contacts = user.getContacts();
        List<DialogPreview> dialogPreviews = new ArrayList<>();
        contacts.forEach(contact -> {
            DialogPreview dialogPreview = new DialogPreview();
            List<Message> messages = messageDao.getReceivedMessages(contact, user, PageRequest.of(0, 1,
                    Sort.by(Sort.Direction.DESC, "timestamp")));
            if (!messages.isEmpty()) {
                dialogPreview.setLastMessage(messages.get(0).toDTO());
            }
            dialogPreview.setUnreadCount(messageDao.getUnreadMessagesCount(contact, user));
            dialogPreview.setContact(contact.toDto());
            dialogPreviews.add(dialogPreview);
        });
        return new DialogsPreviewsResponse(dialogPreviews);
    }

    @Override
    @Transactional
    public ConversationDataResponse getMessages(Principal principal, ConversationDataRequest request) throws Exception {
        requestValidator.validateConversationDataRequest(principal, request);
        User sender = userDao.findByUsername(principal.getName());
        User receiver = userDao.findByPublicUserId(request.getContactId());
        List<MessageDTO> messages = messageDao
                .getAllConversationMessages(sender, receiver, request.getPageRequest())
                .stream()
                .map(Message::toDTO)
                .collect(toList());
        return new ConversationDataResponse(messages);
    }

    @Override
    @Transactional
    public void handleChatCommunicationMessage(Principal principal, MessageDTO messageDto) throws Exception {
        requestValidator.validateChatMessage(principal, messageDto);
        User sender = userDao.findByUsername(principal.getName());
        User receiver = userDao.findByPublicUserId(messageDto.getReceiver().getUserId());
        Message message = new Message();
        message.setTimestamp(new Date());
        message.setMessageText(messageDto.getMessageText());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setPending(true);
        if (connectionManager.hasActiveConnection(receiver)) {
            sendMessage(receiver, message);
        }
        sendMessage(sender, message);
        messageDao.save(message);
    }

    @Override
    @Transactional
    public void markAsRead(Principal principal, List<String> messageIds) throws Exception {
        requestValidator.validateMarkAsRead(principal, messageIds);
        messageDao.markAsRead(messageIds);
    }

    private void sendMessage(User dest, Message message) {
        messagingTemplate.convertAndSendToUser(dest.getUsername(), "/queue/messages", message.toDTO());
    }
}

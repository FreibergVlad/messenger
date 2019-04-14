package com.freiberg.service.impl;

import com.freiberg.connection.ConnectionManager;
import com.freiberg.dao.MessageDao;
import com.freiberg.model.DialogPreview;
import com.freiberg.model.Message;
import com.freiberg.model.MessageDTO;
import com.freiberg.service.MessagingService;
import com.freiberg.validator.RequestValidator;
import dao.UserDao;
import lombok.AllArgsConstructor;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
    public List<DialogPreview> getContacts(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        Set<User> contacts = user.getContacts();
        List<DialogPreview> dialogPreviews = new ArrayList<>();

        contacts.forEach(contact -> {
            DialogPreview dialogPreview = new DialogPreview();
            dialogPreview.setUserId(contact.getId());
            dialogPreview.setUsername(contact.getUsername());
            Message lastReceivedMessage = messageDao.findFirstBySenderEqualsAndReceiverEqualsOrderByTimestampDesc(contact, user);
            if (lastReceivedMessage != null) {
                dialogPreview.setLastMessage(lastReceivedMessage.getMessageText());
                dialogPreview.setTimestamp(lastReceivedMessage.getTimestamp());
            }
            dialogPreviews.add(dialogPreview);
        });

        return dialogPreviews;
    }

    @Override
    @Transactional
    public List<MessageDTO> handleConversationDataRequest(Principal principal, Long conversationId) throws Exception {
        try {
            requestValidator.validateConversationDataRequest(principal, conversationId);

            User sender = userDao.findByUsername(principal.getName());
            User receiver = userDao.findById(conversationId).get();

            return getAllConversationData(sender, receiver)
                    .stream()
                    .map(Message::toDTO)
                    .sorted(Comparator.comparing(MessageDTO::getTimestamp))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            LOG.error("Error while fetching conversation data. " + e.getMessage(), e);
            throw new Exception(e);
        }
    }

    @Override
    public void handleChatCommunicationMessage(Principal principal, MessageDTO messageDto) throws Exception {
        if (!Objects.equals(messageDto.getSenderUsername(), principal.getName())) {
            throw new Exception();
        }
        User sender = userDao.findByUsername(messageDto.getSenderUsername());
        User receiver = userDao.findByUsername(messageDto.getReceiverUsername());
        String messageText = messageDto.getMessageText();
        if (sender == null || receiver == null) {
            throw new Exception();
        }
        if (!sender.getContacts().contains(receiver)) {
            throw new Exception();
        }
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setMessageText(messageText);
        message.setTimestamp(new Date());
        if (!connectionManager.hasActiveConnection(receiver)) {
            message.setPending(true);
            messageDao.save(message);
        } else {
            messageDao.save(message);
            sendMessage(receiver, message);
        }
        sendMessage(sender, message);
    }

    private List<Message> getAllConversationData(User sender, User receiver) {
        List<Message> messages = new ArrayList<>();
        List<Message> sentMessages = messageDao.findMessageBySenderEqualsAndReceiverEquals(sender, receiver);
        List<Message> receivedMessages = messageDao.findMessageBySenderEqualsAndReceiverEquals(receiver, sender);
        messages.addAll(sentMessages);
        messages.addAll(receivedMessages);
        return messages;
    }

    private void sendMessage(User dest, Message message) {
        messagingTemplate.convertAndSendToUser(dest.getUsername(), "/queue/messages", message.toDTO());
    }
}

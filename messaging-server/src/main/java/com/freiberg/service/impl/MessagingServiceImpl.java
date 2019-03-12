package com.freiberg.service.impl;

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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MessagingServiceImpl implements MessagingService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private UserDao userDao;
    private MessageDao messageDao;

    private RequestValidator requestValidator;

    @Override
    @Transactional
    public List<DialogPreview> getContacts(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        Set<User> contacts = user.getContacts();
        List<DialogPreview> dialogPreviews = new ArrayList<>();

        contacts.forEach(contact -> dialogPreviews
                .add(new DialogPreview(contact.getId(), contact.getUsername(), "Mocked message")));

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

    private List<Message> getAllConversationData(User sender, User receiver) {
        List<Message> messages = new ArrayList<>();
        List<Message> sentMessages = messageDao.findMessageBySenderEqualsAndReceiverEquals(sender, receiver);
        List<Message> receivedMessages = messageDao.findMessageBySenderEqualsAndReceiverEquals(receiver, sender);
        messages.addAll(sentMessages);
        messages.addAll(receivedMessages);
        return messages;
    }
}

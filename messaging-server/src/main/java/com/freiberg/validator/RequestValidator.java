package com.freiberg.validator;

import com.freiberg.dao.MessageDao;
import com.freiberg.model.messages.ConversationDataRequest;
import com.freiberg.model.MessageDTO;
import com.freiberg.model.messages.Message;
import dao.UserDao;
import lombok.AllArgsConstructor;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Nullable;
import javax.transaction.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class RequestValidator {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private UserDao userDao;
    private MessageDao messageDao;

    @Transactional
    public void validateConversationDataRequest(Principal principal, ConversationDataRequest request) throws Exception {
        checkAuthentication(principal);
        User sender = userDao.findByUsername(principal.getName());
        User receiver = userDao.findByPublicUserId(request.getContactId());
        checkWriteAccess(sender, receiver);
    }

    @Transactional
    public void validateChatMessage(Principal principal, MessageDTO messageDTO) throws Exception {
        checkAuthentication(principal);
        User sender = userDao.findByUsername(principal.getName());
        User receiver = userDao.findByPublicUserId(messageDTO.getReceiver().getUserId());
        checkWriteAccess(sender, receiver);
    }

    @Transactional
    public void validateMarkAsRead(Principal principal, List<String> messageIds) throws Exception {
        checkAuthentication(principal);
        for (String messageId: messageIds) {
            Optional<Message> messageOptional = messageDao.findById(messageId);
            if (messageOptional.isPresent()) {
                if (!messageOptional.get().getReceiver().getUsername().equals(principal.getName())) {
                    logErrorAndThrow("Message does not belongs to this user");
                }
            } else {
                logErrorAndThrow(String.format("Message with id %s doesn't exist", messageId));
            }
        }
    }

    /**
     * Checks if sender can send messages to receiver
     * TODO Find more appropriate method name
     */
    private void checkWriteAccess(@Nullable User sender, @Nullable User receiver) throws Exception {
        if (sender == null || receiver == null) {
            logErrorAndThrow("User doesn't exist");
        } else {
            if (!sender.getContacts().contains(receiver)) {
                logErrorAndThrow(String.format("User %s doesn't have access rights to send messages to user %s",
                                sender, receiver));
            }
        }
    }

    private void checkAuthentication(@Nullable Principal principal) throws Exception {
        if (principal == null) {
            logErrorAndThrow("Principal is null");
        }
    }

    private void logErrorAndThrow(String message) throws Exception {
        LOG.error(message);
        throw new Exception();
    }
}
package com.freiberg.validator;

import dao.UserDao;
import lombok.AllArgsConstructor;
import model.User;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.Optional;

@Component
@AllArgsConstructor
public class RequestValidator {

    private UserDao userDao;

    @Transactional
    public void validateConversationDataRequest(Principal principal, Long conversationId) throws Exception {
        if (principal == null) {
            throw new Exception("Principal is null");
        }
        User sender = userDao.findByUsername(principal.getName());
        if (sender == null) {
            throw new Exception("Sender doesn't exists");
        }
        if (conversationId == null) {
            throw new Exception("Conversation ID is null");
        }
        Optional<User> receiver = userDao.findById(conversationId);
        if (!receiver.isPresent()) {
            throw new Exception("Receiver is null");
        }
        if (!sender.getContacts().contains(receiver.get())) {
            throw new Exception("Sender doesn't have receiver in contacts list");
        }
    }
}

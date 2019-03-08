package com.freiberg.service.impl;

import com.freiberg.model.DialogPreview;
import com.freiberg.model.Message;
import com.freiberg.service.MessagingService;
import dao.UserDao;
import lombok.AllArgsConstructor;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class MessagingServiceImpl implements MessagingService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private UserDao userDao;

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
    public List<Message> getMessagesByUserId(Principal principal, SimpMessageHeaderAccessor headerAccessor) {
        return null;
    }
}

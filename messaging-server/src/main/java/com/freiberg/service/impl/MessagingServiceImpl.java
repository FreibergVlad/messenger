package com.freiberg.service.impl;

import com.freiberg.model.DialogPreview;
import com.freiberg.service.MessagingService;
import dao.UserDao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessagingServiceImpl implements MessagingService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private UserDao userDao;

    @Override
    public List<DialogPreview> getContacts(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        Set<User> contacts = user.getContacts();
        List<DialogPreview> dialogPreviews = new ArrayList<>();

        contacts.forEach(contact -> dialogPreviews.add(
                        new DialogPreview(contact.getUsername(), "Mocked message")));

        return dialogPreviews;
    }
}

package com.freiberg.authserver.service;

import dao.RoleDao;
import dao.UserDao;
import lombok.AllArgsConstructor;
import model.Role;
import model.User;
import com.freiberg.authserver.model.RegistrationDTO;
import model.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserService {

    private UserDao userDao;
    private RoleDao roleDao;
    private PasswordEncoder passwordEncoder;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final static String DEFAULT_ROLE = "ROLE_USER";

    public UserDTO handleRegistrationRequest(RegistrationDTO registrationDTO) {
        User user = createUserAccount(registrationDTO);
        logger.info("Created new account: " + user);
        return user.toDto();
    }

    private User createUserAccount(RegistrationDTO registrationDTO) {
        Set<Role> roles = new HashSet<>(Collections.singletonList(roleDao.findByName(DEFAULT_ROLE)));
        return createUserAccount(registrationDTO, roles);
    }

    private User createUserAccount(RegistrationDTO registrationDTO, Set<Role> roles) {
        String username = registrationDTO.getUsername();
        String passHash = passwordEncoder.encode(registrationDTO.getPassword());
        User user = new User();
        user.setUsername(username);
        user.setPassword(passHash);
        user.setRoles(roles);
        user.setLocked(false);
        user.setLastLogin(null);
        user.setContacts(Collections.emptySet());
        return userDao.save(user);
    }
}

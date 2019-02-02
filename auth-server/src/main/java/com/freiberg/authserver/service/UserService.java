package com.freiberg.authserver.service;

import dao.RoleDao;
import dao.UserDao;
import lombok.AllArgsConstructor;
import model.Role;
import model.User;
import model.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
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

    public UserDto handleRegistrationRequest(UserDto userDto) {
        User user = createUserAccount(userDto);
        logger.info(new Date() + " Created new account: " + user);
        return userDto;
    }

    private User createUserAccount(UserDto userDto) {
        Set<Role> roles = new HashSet<>(Collections.singletonList(roleDao.findByName(DEFAULT_ROLE)));
        return createUserAccount(userDto, roles);
    }

    private User createUserAccount(UserDto userDto, Set<Role> roles) {
        String username = userDto.getUsername();
        String passHash = passwordEncoder.encode(userDto.getPassword());
        User user = new User();
        user.setUsername(username);
        user.setPassword(passHash);
        user.setRoles(roles);
        user.setLocked(false);
        user.setLastLogin(null);
        return userDao.save(user);
    }
}

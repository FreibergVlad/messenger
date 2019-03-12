package com.freiberg.dao;

import com.freiberg.model.Message;
import model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageDao extends JpaRepository<Message, Long> {

    List<Message> findMessageBySenderEqualsAndReceiverEquals(User sender, User receiver);
}

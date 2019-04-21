package com.freiberg.dao;

import com.freiberg.model.messages.Message;
import model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MessageDao extends PagingAndSortingRepository<Message, String> {

    String GET_RECEIVED_MESSAGES_QUERY = "select m from Message m where " +
            "(m.sender = :sender and m.receiver = :receiver)";

    String GET_CONVERSATION_MESSAGES_QUERY = "select m from Message m where " +
            "(m.sender = :sender and m.receiver = :receiver) " +
            "or (m.sender = :receiver and m.receiver = :sender)";

    String GET_UNREAD_MESSAGES_COUNT_QUERY = "select count(m.messageId) from Message m where " +
            "(m.sender = :sender and m.receiver = :receiver) and m.pending = 1";

    String MARK_AS_READ_QUERY = "update Message m set m.pending = false where m.messageId in :messageIds";

    @Query(GET_CONVERSATION_MESSAGES_QUERY)
    List<Message> getAllConversationMessages(User sender, User receiver, Pageable limit);

    @Query(GET_RECEIVED_MESSAGES_QUERY)
    List<Message> getReceivedMessages(User sender, User receiver, Pageable limit);

    @Query(GET_UNREAD_MESSAGES_COUNT_QUERY)
    Long getUnreadMessagesCount(User sender, User receiver);

    @Query(MARK_AS_READ_QUERY)
    @Modifying
    void markAsRead(List<String> messageIds);

}

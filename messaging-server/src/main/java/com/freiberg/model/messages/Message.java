package com.freiberg.model.messages;

import com.freiberg.model.MessageDTO;
import com.freiberg.model.MessageType;
import com.freiberg.model.messages.AbstractChatMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import model.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message extends AbstractChatMessage {

    @Getter
    @Setter
    private boolean pending;

    @Column
    @Getter
    @Setter
    private String messageText;

    @Column
    @Getter
    @Setter
    private Date timestamp;

    @Override
    @Id
    @Column(name = "messageId")
    public String getMessageId() {
        return messageId;
    }

    @Override
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "senderId",
            referencedColumnName = "userID"
    )
    public User getSender() {
        return sender;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "receiverId",
            referencedColumnName = "userID"
    )
    public User getReceiver() {
        return receiver;
    }

    @Override
    @Column
    @Enumerated(EnumType.STRING)
    @Transient
    public MessageType getMessageType() {
        return MessageType.CHAT_COMMUNICATION;
    }

    public MessageDTO toDTO() {
        return new MessageDTO(messageId, sender.toDto(), receiver.toDto(),
                timestamp, messageText, !pending, getMessageType());
    }
}

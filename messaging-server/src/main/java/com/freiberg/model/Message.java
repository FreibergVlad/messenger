package com.freiberg.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "messageId")
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "senderId",
            referencedColumnName = "userID"
    )
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "receiverId",
            referencedColumnName = "userID"
    )
    private User receiver;

    @Column
    private boolean isPending;

    @Column
    private String messageText;

    @Column
    private Date timestamp;

    @Column
    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    public MessageDTO toDTO() {
        return new MessageDTO(sender.getUsername(), receiver.getUsername(),
                timestamp, messageText, messageType);
    }

}

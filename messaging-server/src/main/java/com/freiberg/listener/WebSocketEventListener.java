package com.freiberg.listener;

import com.freiberg.connection.ConnectionManager;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;

@Data
public abstract class WebSocketEventListener<T extends AbstractSubProtocolEvent> {

    protected final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    protected ConnectionManager connectionManager;

    abstract void onEvent(T event);

    String extractSessionId(AbstractSubProtocolEvent event) {
        return (String) event.getMessage().getHeaders().get("simpSessionId");
    }

}

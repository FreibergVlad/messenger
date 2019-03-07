package com.freiberg.listener;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;

@Component
@Data
public abstract class WebSocketEventListener<T extends AbstractSubProtocolEvent> {

    protected final Logger LOG = LoggerFactory.getLogger(getClass());

    abstract void onEvent(T event);

}

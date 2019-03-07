package com.freiberg.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketDisconnectionListener extends WebSocketEventListener<SessionDisconnectEvent> {

    @Override
    @EventListener
    public void onEvent(SessionDisconnectEvent event) {
        LOG.info("Disconnected " + event.toString());
    }
}

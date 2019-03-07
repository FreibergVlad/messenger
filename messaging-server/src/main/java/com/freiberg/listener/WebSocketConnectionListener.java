package com.freiberg.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class WebSocketConnectionListener extends WebSocketEventListener<SessionConnectEvent> {

    @Override
    @EventListener
    public void onEvent(SessionConnectEvent event) {
        LOG.info("Connect " + event.toString());
    }
}

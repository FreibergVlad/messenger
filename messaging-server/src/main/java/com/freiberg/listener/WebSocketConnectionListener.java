package com.freiberg.listener;

import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
@AllArgsConstructor
public class WebSocketConnectionListener extends WebSocketEventListener<SessionConnectEvent> {

    @Override
    @EventListener
    public void onEvent(SessionConnectEvent event) {
        String sessionId = extractSessionId(event);
        String username = event.getUser().getName();
        connectionManager.addActiveConnection(username, sessionId);
        LOG.info("Connect " + event.toString());
    }
}

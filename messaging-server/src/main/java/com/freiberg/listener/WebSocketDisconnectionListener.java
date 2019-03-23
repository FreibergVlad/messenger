package com.freiberg.listener;

import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@AllArgsConstructor
public class WebSocketDisconnectionListener extends WebSocketEventListener<SessionDisconnectEvent> {

    @Override
    @EventListener
    public void onEvent(SessionDisconnectEvent event) {
        String sessionId = extractSessionId(event);
        String username = event.getUser().getName();
        connectionManager.removeActiveConnection(username, sessionId);
        LOG.info("Disconnected " + event.toString());
    }
}

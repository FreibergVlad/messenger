package com.freiberg.connection;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multimaps;
import model.User;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class ConnectionManager {

    private final Multimap<String, String> activeConnections = Multimaps.synchronizedListMultimap(ArrayListMultimap.create());

    public void addActiveConnection(String username, String sessionId) {
        activeConnections.put(username, sessionId);
    }

    public Collection<String> getActiveConnections(String username) {
        return activeConnections.get(username);
    }

    public void removeActiveConnection(String username, String sessionId) {
        activeConnections.remove(username, sessionId);
    }

    public boolean hasActiveConnection(User user) {
        return hasActiveConnection(user.getUsername());
    }

    public boolean hasActiveConnection(String username) {
        return activeConnections.containsKey(username);
    }

}

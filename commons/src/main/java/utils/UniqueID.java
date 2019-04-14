package utils;

import java.util.UUID;

public class UniqueID {

    public static String getUniqueId() {
        return UUID.randomUUID().toString();
    }
}

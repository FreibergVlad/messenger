package com.freiberg.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "crypto")
@Data
public class CryptographyProperties {

    private String encryptionKeyPath;
}

package com.freiberg.config;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.file.Files;

@Configuration
@Data
public class CryptographyConfig {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private CryptographyProperties configurationSource;
    private ConfigurableApplicationContext ctx;
    private ResourceLoader resourceLoader;

    private String key;

    public CryptographyConfig(CryptographyProperties configurationSource,
                              ConfigurableApplicationContext ctx,
                              ResourceLoader resourceLoader) {
        this.configurationSource = configurationSource;
        this.ctx = ctx;
        this.resourceLoader = resourceLoader;
    }

    @PostConstruct
    public void initializeKey() {
        try {
            String encryptionKeyPath = configurationSource.getEncryptionKeyPath();
            File encryptionKeyFile = resourceLoader.getResource(encryptionKeyPath).getFile();
            this.key = new String(Files.readAllBytes(encryptionKeyFile.toPath()));
        } catch (Exception e) {
            LOG.error(String.format(
                    "Message encryption key can't be read from %s. Messaging service can't be started",
                    configurationSource.getEncryptionKeyPath()), e);
            ctx.close();
        }
    }
}

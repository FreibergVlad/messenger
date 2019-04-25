package com.freiberg.converter;

import com.freiberg.config.CryptographyConfig;
import com.freiberg.service.SymmetricEncryptionService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.security.GeneralSecurityException;

@Converter
@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CryptoConverter implements AttributeConverter<String, String> {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    private CryptographyConfig cryptographyConfig;
    private SymmetricEncryptionService symmetricEncryptionService;

    @Override
    public synchronized String convertToDatabaseColumn(String s) {
        try {
            return symmetricEncryptionService.encrypt(s, cryptographyConfig.getKey());
        } catch (GeneralSecurityException e) {
            LOG.error("Error during data encryption", e);
            throw new RuntimeException();
        }
    }

    @Override
    public synchronized String convertToEntityAttribute(String s) {
        try {
            return symmetricEncryptionService.decrypt(s, cryptographyConfig.getKey());
        } catch (GeneralSecurityException e) {
            LOG.error("Error during data decryption", e);
            throw new RuntimeException();
        }
    }
}

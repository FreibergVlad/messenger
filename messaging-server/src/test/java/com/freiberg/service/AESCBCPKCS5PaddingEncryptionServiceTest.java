package com.freiberg.service;

import com.freiberg.service.impl.AESCBCPKCS5PaddingEncryptionService;
import lombok.Data;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.security.GeneralSecurityException;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = AESCBCPKCS5PaddingEncryptionService.class)
@Data
public class AESCBCPKCS5PaddingEncryptionServiceTest {

    @Autowired
    private SymmetricEncryptionService encryptionService;

    @Test
    public void encryptionAndDecryptionTest() throws GeneralSecurityException {
        String key = "password";
        String plainText = "plainText";

        String encryptedText = encryptionService.encrypt(plainText, key);
        String decryptedText = encryptionService.decrypt(encryptedText, key);

        Assert.assertEquals(plainText, decryptedText);
    }

}

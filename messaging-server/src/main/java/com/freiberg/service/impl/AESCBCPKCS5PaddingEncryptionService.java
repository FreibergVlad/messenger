package com.freiberg.service.impl;

import com.freiberg.service.SymmetricEncryptionService;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

/**
 * Encrypts data using AES/GCM mode with PKCS5Padding.
 * The following format of encrypted data is used:
 *  data = ivLength + iv + payload
 * Where, ivLength = 1 byte that stores length of the initialization vector
 *        iv = initialization vector, byte sequence of ivLength length
 *        payload = encrypted message
 */
@Service
@Data
public class AESCBCPKCS5PaddingEncryptionService implements SymmetricEncryptionService {

    private static final String CIPHER_GCM_SPEC = "AES/GCM/PKCS5Padding";
    private static final String PRNG_SPEC = "SHA1PRNG";
    private static final String DIGEST_SPEC = "SHA1";
    private static final int GCM_TAG_BIT_LENGTH = 128;
    private static final int AES_KEY_LENGTH_BYTE = 32;
    private static final int IV_LENGTH_BYTE = 12;

    private SecureRandom secureRandom;
    private MessageDigest messageDigest;

    @PostConstruct
    public void initializeRNG() throws GeneralSecurityException {
        this.secureRandom = SecureRandom.getInstance(PRNG_SPEC);
        this.messageDigest = MessageDigest.getInstance(DIGEST_SPEC);
    }

    @Override
    public String encrypt(String plainText, String key) throws GeneralSecurityException {
        byte[] iv = getInitializationVector();

        Cipher cipher = getCipherInstance();
        cipher.init(Cipher.ENCRYPT_MODE, getSecretKeySpec(key), getGcmParameterSpec(iv));

        byte[] encrypted = cipher.doFinal(plainText.getBytes());

        ByteBuffer byteBuffer = ByteBuffer.allocate(1 + IV_LENGTH_BYTE + encrypted.length);
        byteBuffer.put((byte) IV_LENGTH_BYTE);
        byteBuffer.put(iv);
        byteBuffer.put(encrypted);

        return Base64.getEncoder().encodeToString(byteBuffer.array());
    }

    @Override
    public String decrypt(String cipherText, String key) throws GeneralSecurityException {
        byte[] encryptedBytes = Base64.getDecoder().decode(cipherText);
        ByteBuffer encryptedByteBuffer = ByteBuffer.wrap(encryptedBytes);
        int ivLength = encryptedByteBuffer.get();
        byte[] iv = new byte[ivLength];
        encryptedByteBuffer.get(iv);
        byte[] encrypted = new byte[encryptedByteBuffer.remaining()];
        encryptedByteBuffer.get(encrypted);

        Cipher cipher = getCipherInstance();
        cipher.init(Cipher.DECRYPT_MODE, getSecretKeySpec(key), getGcmParameterSpec(iv));

        byte[] decryptedTextBytes = cipher.doFinal(encrypted);

        return new String(decryptedTextBytes);

    }

    private byte[] getInitializationVector() {
        byte[] iv = new byte[IV_LENGTH_BYTE];
        secureRandom.nextBytes(iv);
        return iv;
    }

    private Cipher getCipherInstance() throws GeneralSecurityException {
        return Cipher.getInstance(CIPHER_GCM_SPEC);
    }

    private SecretKeySpec getSecretKeySpec(String key) {
        byte[] keyHash = messageDigest.digest(key.getBytes());
        keyHash = Arrays.copyOf(keyHash, AES_KEY_LENGTH_BYTE);
        return new SecretKeySpec(keyHash, "AES");
    }

    private GCMParameterSpec getGcmParameterSpec(byte[] iv) {
        return new GCMParameterSpec(GCM_TAG_BIT_LENGTH, iv);
    }
}

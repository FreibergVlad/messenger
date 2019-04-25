package com.freiberg.service;

import java.security.GeneralSecurityException;

public interface SymmetricEncryptionService {

    String encrypt(String plainText, String key) throws GeneralSecurityException;

    String decrypt(String cipherText, String key) throws GeneralSecurityException;
}

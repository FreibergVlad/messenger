package com.freiberg.service;

import com.freiberg.model.DialogPreview;

import java.security.Principal;
import java.util.List;

public interface MessagingService {

    List<DialogPreview> getContacts(Principal principal);
}

INSERT INTO allowed_origins (url) VALUES ('localhost:4200');

INSERT INTO oauth_client_details (client_id, authorized_grant_types, scope, autoapprove, web_server_redirect_uri)
  VALUES ('testClientId', 'implicit', 'read,write', 'true', 'localhost:4200');

INSERT INTO `users` (userID, username, password, last_login, locked)
  VALUES (1, 'vladislav','$2a$11$p8QNJScZapEtVA447zHg1eqJ78.8WkxMa6jr6D5htl/T0k.MJ4Pdi',NULL,0);
INSERT INTO `users` (userID, username, password, last_login, locked)
  VALUES (2, 'JamesDoe','$2a$11$bVQPgCxeLWoa.xoPmU0KIeGxjg/POV18nOS9zufQJTq3jZeuVXdMq',NULL,0);
INSERT INTO `users` (userID, username, password, last_login, locked)
  VALUES (3, 'AliceAndBob','$2a$11$jxFPc3ZH4HuM1Q7SqKOdJOZ97FUSklj41n87x5WhiZPlR6NgvdOzK',NULL,0);
INSERT INTO `users` (userID, username, password, last_login, locked)
  VALUES (4, 'UnknownHuman','$2a$11$1R1xzfUenSzpUINTmDxJmOkMRJxJkv9NCzoSUNnI7l77BQaRgjs3i',NULL,0);


INSERT INTO roles (roleID, name) VALUES (1, 'ROLE_USER');

-- Mapping of users to their roles
INSERT INTO `user_roles` VALUES (1,1);
INSERT INTO `user_roles` VALUES (2,1);
INSERT INTO `user_roles` VALUES (3,1);
INSERT INTO `user_roles` VALUES (4,1);

-- Contacts for userID 1
INSERT INTO contacts (userID, contactID) VALUES (1, 2);
INSERT INTO contacts (userID, contactID) VALUES (1, 3);
INSERT INTO contacts (userID, contactID) VALUES (1, 4);

-- Contacts for userID 2
INSERT INTO contacts (userID, contactID) VALUES (2, 1);

-- Contacts for userID 3
INSERT INTO contacts (userID, contactID) VALUES (3, 1);

-- Contacts for userID 4
INSERT INTO contacts (userID, contactID) VALUES (4, 1);
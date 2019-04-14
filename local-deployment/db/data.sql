INSERT INTO allowed_origins (url) VALUES ('https://ui-server.com'), ('http://localhost:4200');

INSERT INTO oauth_client_details (client_id, authorized_grant_types, scope, autoapprove, web_server_redirect_uri)
  VALUES ('testClientId', 'implicit', 'read,write', 'true', 'https://ui-server.com');

INSERT INTO `users` (userID, publicUserId, username, password, lastLogin, locked)
  VALUES (1,
          '010e5fa1-a8e1-4f4a-b359-de262c5365f2',
          'vladislav',
          '$2a$11$p8QNJScZapEtVA447zHg1eqJ78.8WkxMa6jr6D5htl/T0k.MJ4Pdi',
          NULL,
          0);
INSERT INTO `users` (userID, publicUserId, username, password, lastLogin, locked)
  VALUES (2,
          'cad73fc9-cc9a-44bd-9b06-3b5c8f89edca',
          'JamesDoe',
          '$2a$11$bVQPgCxeLWoa.xoPmU0KIeGxjg/POV18nOS9zufQJTq3jZeuVXdMq',
          NULL,
          0);
INSERT INTO `users` (userID, publicUserId, username, password, lastLogin, locked)
  VALUES (3,
          '054e9b38-ea1e-4154-b6e8-eb92fd1d1fe8',
          'AliceAndBob',
          '$2a$11$jxFPc3ZH4HuM1Q7SqKOdJOZ97FUSklj41n87x5WhiZPlR6NgvdOzK',
          NULL,
          0);
INSERT INTO `users` (userID, publicUserId, username, password, lastLogin, locked)
  VALUES (4,
          '63dba38c-01d8-4f2f-96a6-ae9813b77503',
          'UnknownHuman',
          '$2a$11$1R1xzfUenSzpUINTmDxJmOkMRJxJkv9NCzoSUNnI7l77BQaRgjs3i',
          NULL,
          0);

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
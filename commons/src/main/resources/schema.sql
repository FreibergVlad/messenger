DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

-- Table: users
CREATE TABLE users (
  userID   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  lastLogin DATETIME,
  locked BOOLEAN DEFAULT FALSE
)
  ENGINE = InnoDB;

CREATE TABLE contacts (
  userID INT NOT NULL,
  contactID INT NOT NULL,

  FOREIGN KEY (userID) REFERENCES users (userID),
  FOREIGN KEY (contactID) REFERENCES users (userID),

  UNIQUE (userID, contactID)
)
  ENGINE = InnoDB;

-- Table: roles
CREATE TABLE roles (
  roleID INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name   VARCHAR(100) NOT NULL
)
  ENGINE = InnoDB;

-- Table for mapping user and roles: user_roles
CREATE TABLE user_roles (
  userID INT NOT NULL,
  roleID INT NOT NULL,

  FOREIGN KEY (userID) REFERENCES users (userID),
  FOREIGN KEY (roleID) REFERENCES roles (roleID),

  UNIQUE (userID, roleID)
)
  ENGINE = InnoDB;

CREATE TABLE messages (
  messageId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  senderId INT,
  receiverId INT,
  messageText LONGTEXT,
  messageType VARCHAR(255),
  isPending TINYINT,
  timestamp TIMESTAMP,

  FOREIGN KEY (senderId) REFERENCES users (userID),
  FOREIGN KEY (receiverId) REFERENCES users (userID)
)
  ENGINE = InnoDB;

CREATE TABLE allowed_origins (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255)
)
  ENGINE = InnoDB;

drop table if exists oauth_client_details;
create table oauth_client_details (
  client_id VARCHAR(255) PRIMARY KEY,
  resource_ids VARCHAR(255),
  client_secret VARCHAR(255),
  scope VARCHAR(255),
  authorized_grant_types VARCHAR(255),
  web_server_redirect_uri VARCHAR(255),
  authorities VARCHAR(255),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(255)
);

drop table if exists oauth_client_token;
create table oauth_client_token (
  token_id VARCHAR(255),
  token LONG,
  authentication_id VARCHAR(255) PRIMARY KEY,
  user_name VARCHAR(255),
  client_id VARCHAR(255)
);

drop table if exists oauth_access_token;
create table oauth_access_token (
  token_id VARCHAR(255),
  token VARCHAR(255),
  authentication_id VARCHAR(255) PRIMARY KEY,
  user_name VARCHAR(255),
  client_id VARCHAR(255),
  authentication LONG,
  refresh_token VARCHAR(255)
);

drop table if exists oauth_refresh_token;
create table oauth_refresh_token (
  token_id VARCHAR(255),
  token LONG,
  authentication LONG
);

drop table if exists oauth_code;
create table oauth_code (
  code VARCHAR(255), authentication LONG
);

drop table if exists oauth_approvals;
create table oauth_approvals (
  userId VARCHAR(255),
  clientId VARCHAR(255),
  scope VARCHAR(255),
  status VARCHAR(10),
  expiresAt TIMESTAMP,
  lastModifiedAt TIMESTAMP
);

drop table if exists ClientDetails;
create table ClientDetails (
  appId VARCHAR(255) PRIMARY KEY,
  resourceIds VARCHAR(255),
  appSecret VARCHAR(255),
  scope VARCHAR(255),
  grantTypes VARCHAR(255),
  redirectUrl VARCHAR(255),
  authorities VARCHAR(255),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additionalInformation VARCHAR(4096),
  autoApproveScopes VARCHAR(255)
);
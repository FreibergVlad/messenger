import { AuthConfig } from 'angular-oauth2-oidc';

export class Config {

  static readonly AUTH_SERVER_URL = 'https://localhost:8443';

  static readonly AUTH_CONFIG: AuthConfig = {
    loginUrl: `${Config.AUTH_SERVER_URL}/oauth/authorize`,
    logoutUrl: `${Config.AUTH_SERVER_URL}/logout`,
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
    responseType: 'token',
    oidc: false,
    clientId: 'testClientId',
    scope: 'read write',
    clearHashAfterLogin: true
  };

}

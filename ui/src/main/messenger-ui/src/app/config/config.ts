import { AuthConfig } from 'angular-oauth2-oidc';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

export class Config {

  static readonly AUTH_SERVER_URL = 'https://localhost:8443';
  static readonly MESSAGING_SERVER_URL = 'wss://localhost:7443/ws-gateway';

  static readonly APP_DEST_PREFIX = '/api';

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

  static readonly WS_CONFIG: InjectableRxStompConfig = {
    brokerURL: Config.MESSAGING_SERVER_URL
  };

  static readonly MESSAGING_CONFIG = {
    getContactsListURL: `${Config.APP_DEST_PREFIX}/contacts`
  };

}

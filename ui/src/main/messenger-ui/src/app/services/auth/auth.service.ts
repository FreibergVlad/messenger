import { Injectable } from '@angular/core';
import { Config } from '../../config/config';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(Config.AUTH_CONFIG);
    this.oauthService.setStorage(sessionStorage);
  }

  obtainAccessToken(): Promise<void> {
    return this.oauthService.tryLogin({})
      .then((tokenPresentsInUrl) => {
        if (!tokenPresentsInUrl && !this.oauthService.getAccessToken()) {
          this.oauthService.initImplicitFlow();
        }
        location.hash = '';
      });
  }

  logOut() {
    this.oauthService.logOut();
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    return !!this.oauthService.getAccessToken();
  }

}

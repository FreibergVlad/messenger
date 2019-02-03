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
    this.oauthService.tryLogin({})
      .then((tokenPresentsInUrl) => {
        if (!tokenPresentsInUrl && !this.oauthService.getAccessToken()) {
          this.obtainAccessToken();
        }
      });
  }

  obtainAccessToken() {
    this.oauthService.initImplicitFlow();
  }

  logOut() {
    this.oauthService.logOut();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    return !!this.oauthService.getAccessToken();
  }

}

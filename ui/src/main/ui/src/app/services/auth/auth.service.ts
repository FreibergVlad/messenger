import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {AccessToken} from '../../shared/models/access-token';

@Injectable()
export class AuthService implements CanActivate {

  readonly authServerUrl: string = 'http://localhost:8080';
  readonly grantType: string = 'password';
  readonly clientId: string = 'clientIdPassword';
  readonly clientSecret: string = 'secret';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  obtainAccessToken(loginData): Observable<AccessToken> {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', this.grantType);
    params.append('client_id', this.clientId);
    params.append('secret', this.clientSecret);
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': this.getAuthHeader()
    });
    return this.httpClient.post<AccessToken>(this.authServerUrl + '/oauth/token', params.toString(), { headers: headers });
  }

  createAccount(regData): Observable<any> {
    const params = new URLSearchParams();
    const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });
    params.append('username', regData.username);
    params.append('password', regData.password);
    params.append('confirmPassword', regData.confirmPassword);
    return this.httpClient.post<any>(this.authServerUrl + '/register', params.toString(), { headers: headers });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.getToken()) {
    //   return true;
    // }
    // this.router.navigateByUrl('/login');
    // return false;
    return true;
  }

  getToken(): AccessToken {
    return JSON.parse(sessionStorage.getItem('auth_token'));
  }

  saveToken(token: AccessToken) {
    sessionStorage.setItem('auth_token', JSON.stringify(token));
  }

  logout() {
    this.router.navigateByUrl('/login').then(
      () => sessionStorage.removeItem('auth_token')
    );
  }

  private getAuthHeader() {
    return 'Basic ' + btoa(this.clientId + ':' + this.clientSecret);
  }

}


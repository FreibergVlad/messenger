import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {

    constructor(private authService: AuthService,
                private router: Router) { }

    invalidCredentials = false;
    username: string;
    password: string;

    authorize(): void {
      const username = this.username;
      const password = this.password;
      if (username && password) {
        this.authService.obtainAccessToken({
          username: username,
          password: password
        })
          .subscribe(token => {
            this.authService.saveToken(token);
            this.router.navigateByUrl('/dialogs');
          },
              error => {
                this.invalidCredentials = true;
                setTimeout(() => this.invalidCredentials = false, 3000);
          });
      }
    }
}

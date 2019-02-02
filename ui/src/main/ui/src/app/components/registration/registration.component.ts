import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthService]
})
export class RegistrationComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  username: string;
  password: string;
  confirmPassword: string;
  invalidCredentials = false;

  register(): void {
    if (this.validateCredentials()) {
      this.authService.createAccount({
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
        .subscribe(() => {
          this.authService.obtainAccessToken({ username: this.username, password: this.password })
            .subscribe(token => {
              this.authService.saveToken(token);
              this.router.navigateByUrl('/dialogs');
            }, error => console.log(error));
        }, error => console.log(error));
    } else {
      this.invalidCredentials = true;
    }
  }

  private validateCredentials(): boolean {
    return this.username && this.password && this.password === this.confirmPassword;
  }

}

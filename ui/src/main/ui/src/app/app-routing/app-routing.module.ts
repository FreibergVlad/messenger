import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegistrationComponent} from '../components/registration/registration.component';
import {ChatComponent} from '../components/chat/chat.component';
import {AuthService} from '../services/auth/auth.service';

const routes: Routes = [
    {path: '', redirectTo: '/dialogs', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'dialogs', component: ChatComponent, canActivate: [AuthService]}
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ],
    providers: [AuthService]
})
export class AppRoutingModule { }

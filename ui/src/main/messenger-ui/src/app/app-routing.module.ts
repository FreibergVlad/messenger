import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { DialogsComponent } from './components/dialogs/dialogs.component';

const routes: Routes = [
  {
    path: 'dialogs',
    component: DialogsComponent,
    canActivate: [AuthService]
  },
  {
    path: '',
    redirectTo: 'dialogs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

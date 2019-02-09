import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {
    path: 'dialogs',
    component: DialogsComponent,
    canActivate: [AuthService],
    children: [
      {
        path: ':conversationId',
        component: MessagesComponent,
        outlet: 'conversation'
      }
    ]
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

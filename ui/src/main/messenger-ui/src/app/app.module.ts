import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DialogTabComponent } from './components/dialog-tab/dialog-tab.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule, ScrollPanelModule} from 'primeng/primeng';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { BottomPanelComponent } from './components/bottom-panel/bottom-panel.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { RxStompService } from '@stomp/ng2-stompjs';
import { DomChangeDirective } from './directives/dom-change/dom-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    DialogTabComponent,
    HeaderComponent,
    DialogsComponent,
    MessagesComponent,
    MessageComponent,
    BottomPanelComponent,
    UserAvatarComponent,
    DomChangeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ScrollPanelModule,
    InputTextareaModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

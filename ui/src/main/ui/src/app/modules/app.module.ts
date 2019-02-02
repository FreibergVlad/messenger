import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { HistoryComponent } from '../components/history/history.component';
import { LoginComponent } from '../components/login/login.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { RegistrationComponent } from '../components/registration/registration.component';
import { ChatComponent } from '../components/chat/chat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MessageComponent } from '../components/message/message.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppMaterialModule} from "./app.material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HistoryComponent,
    LoginComponent,
    RegistrationComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      AppMaterialModule,
      FlexLayoutModule,
      ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

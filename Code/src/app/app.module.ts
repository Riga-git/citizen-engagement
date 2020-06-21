import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginPageComponent } from './security/login-page/login-page.component';
import { LogoutButtonComponent } from './security/logout-button/logout-button.component'
import { DummyPageComponent } from './dummy-page/dummy-page.component';

import { ApiTokenInterceptorService } from "./api/api-token-interceptor.service";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DummyPageComponent,
    LogoutButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

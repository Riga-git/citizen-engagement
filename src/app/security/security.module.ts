import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './LoginPage/login-page/login-page.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';



@NgModule({
  declarations: [LoginPageComponent, LogoutButtonComponent],
  imports: [
    CommonModule
  ]
})
export class SecurityModule { }

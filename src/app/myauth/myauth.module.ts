import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyauthRoutingModule} from './myauth-routing.module';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {LoginComponent} from "./login/login.component";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import {ResetpasswordconfrimComponent} from "./resetpasswordconfrim/resetpasswordconfrim.component";
import {SignupComponent} from "./signup/signup.component";

@NgModule({
  declarations: [ForgotPasswordComponent, LoginComponent, LoginModalComponent, ResetpasswordconfrimComponent, SignupComponent],
  imports: [
    CommonModule,
    MyauthRoutingModule
  ]
})
export class MyauthModule {
}

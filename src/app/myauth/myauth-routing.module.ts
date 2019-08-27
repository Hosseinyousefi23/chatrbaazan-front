import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {ResetpasswordconfrimComponent} from "./resetpasswordconfrim/resetpasswordconfrim.component";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password/reset/confirm/:token',
    component: ResetpasswordconfrimComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgetpassword',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyauthRoutingModule {
}

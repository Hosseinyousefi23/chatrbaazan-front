import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from './auth.guard';
import { Page404Component } from './page404/page404.component';
import { CompanyComponent } from './company/company.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ResetpasswordconfrimComponent } from './resetpasswordconfrim/resetpasswordconfrim.component';
import { SendcodeComponent } from './sendcode/sendcode.component';
import { FactorComponent } from './factor/factor.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'about',
    component: AboutusComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'auth/password/reset/confirm/:token',
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
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'sendcode',
    component: SendcodeComponent
  },
  {
    path: 'search/:type',
    component: SearchComponent
  },
  {
    path: 'category/:slug',
    component: CategoriesComponent
  },
  {
    path: 'company/:slug',
    component: CompanyComponent
  },
  {
    path: 'product/:slug',
    component: ProductDetailComponent
  },
  {
    path: 'app/:slug',
    component: ProductDetailComponent
  },
  {
    path: 'offer/:slug',
    component: ProductDetailComponent
  },
  {
    path: 'code/:slug',
    component: ProductDetailComponent
  },
  {
    path: 'cart/factor/:id',
    component: FactorComponent
  },
  {
    path: 'basket',
    component: ShoppingCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },
  {path: '**',  component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

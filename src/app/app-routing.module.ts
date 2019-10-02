import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {Page404Component} from './page404/page404.component';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CompanyComponent} from "./company/company.component";
import {CategoriesComponent} from "./categories/categories.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'List of Products'}
  },
  {
    path: 'info',
    loadChildren: './info/info.module#InfoModule'
  },
  // {
  //   path: 'contact',
  //   component: ContactusComponent
  // },
  // {
  //   path: 'about',
  //   component: AboutusComponent
  // },
  {
    path: 'auth',
    loadChildren: './myauth/myauth.module#MyauthModule'
  },

  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'auth/password/reset/confirm/:token',
  //   component: ResetpasswordconfrimComponent
  // },
  // {
  //   path: 'signup',
  //   component: SignupComponent
  // },
  // {
  //   path: 'forgetpassword',
  //   component: ForgotPasswordComponent
  // },
  // {
  //   path: 'search',
  //   component: SearchComponent
  // },
  // {
  //   path: 'sendcode',
  //   component: SendcodeComponent
  // },
  // {
  //   path: 'search/:type',
  //   component: SearchComponent
  // },
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
  // {
  //   path: 'cart/factor/:id',
  //   component: FactorComponent
  // },
  // {
  //   path: 'basket',
  //   component: ShoppingCardComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'profile',
  //   component: UserprofileComponent,
  //   canActivate: [AuthGuard],
  // },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

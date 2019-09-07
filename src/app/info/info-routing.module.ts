import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactusComponent} from "./contactus/contactus.component";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {SearchComponent} from "./search/search.component";
import {SendcodeComponent} from "./sendcode/sendcode.component";
import {CategoriesComponent} from "./categories/categories.component";
import {FactorComponent} from "./factor/factor.component";
import {ShoppingCardComponent} from "./shopping-card/shopping-card.component";
import {AuthGuard} from "../auth.guard";
import {UserprofileComponent} from "./userprofile/userprofile.component";

const routes: Routes = [
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'about',
    component: AboutusComponent
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
  // {
  //   path: 'company/:slug',
  //   component: CompanyComponent
  // },
  // {
  //   path: 'product/:slug',
  //   component: ProductDetailComponent
  // },
  // {
  //   path: 'app/:slug',
  //   component: ProductDetailComponent
  // },
  // {
  //   path: 'offer/:slug',
  //   component: ProductDetailComponent
  // },
  // {
  //   path: 'code/:slug',
  //   component: ProductDetailComponent
  // },
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {
}

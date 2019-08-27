import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyauthRoutingModule} from './myauth-routing.module';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {LoginComponent} from "./login/login.component";
import {ResetpasswordconfrimComponent} from "./resetpasswordconfrim/resetpasswordconfrim.component";
import {SignupComponent} from "./signup/signup.component";
import {NgtUniversalModule} from "@ng-toolkit/universal";
import {TransferHttpCacheModule} from "@nguniversal/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from "@angular/material";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OwlModule} from "ngx-owl-carousel";
import {ClipboardModule} from "ngx-clipboard";
import {ToastrModule} from "ngx-toastr";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {AgmCoreModule} from "@agm/core";
import {NgxGalleryModule} from "ngx-gallery";
import {ShareButtonModule} from "@ngx-share/button";
import {NgxSpinnerModule} from "ngx-spinner";
import {NgxCaptchaModule} from "ngx-captcha";
import {GoTopButtonModule} from "ng2-go-top-button";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../../environments/environment";

@NgModule({
  declarations: [ForgotPasswordComponent, LoginComponent, ResetpasswordconfrimComponent, SignupComponent],
  imports: [
    CommonModule,
    NgtUniversalModule,

    TransferHttpCacheModule,
    HttpClientModule,


    FormsModule,
    HttpClientModule,
    MyauthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDialogModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatListModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule.forRoot(),
    OwlModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxMDhL_KXYIE_O7Ga8iIpqexZZfUO2ePI'
    }),
    NgxGalleryModule,
    ShareButtonModule,

    MatTabsModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatMenuModule,
    NgxCaptchaModule,
    GoTopButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  exports: [ForgotPasswordComponent, LoginComponent, ResetpasswordconfrimComponent, SignupComponent],
  // entryComponents: [LoginModalComponent]
})
export class MyauthModule {
}

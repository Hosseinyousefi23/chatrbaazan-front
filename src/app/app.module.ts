import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OwlModule} from 'ngx-owl-carousel';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {HttpClientModule} from '@angular/common/http';
import {ShareButtonModule} from '@ngx-share/button';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatRadioModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatTabsModule,
  MatSelectModule,
  MatListModule,
  MatBottomSheetModule,
  MatMenuModule,
  MatExpansionModule,
  MatNativeDateModule,


} from "@angular/material";


import {MatDialogModule, MatDialogRef, MatDialog} from "@angular/material/dialog";

import {ClipboardModule} from 'ngx-clipboard';

import {ToastrModule} from 'ngx-toastr';

import {CountdownTimerModule} from 'ngx-countdown-timer';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {CarouselComponent} from './carousel/carousel.component';
import {OfferComponent} from './offer/offer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import {ContactusComponent} from './contactus/contactus.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AgmCoreModule} from '@agm/core';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {SearchComponent} from './search/search.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ShoppingCardComponent} from './shopping-card/shopping-card.component';
import {SidenavComponent} from './sidenav/sidenav.component';

import {NgxGalleryModule} from 'ngx-gallery';
import {JalaliPipe} from './pipe/jalali.pipe';
import {Page404Component} from './page404/page404.component';
import {CategoriesComponent} from './categories/categories.component';
import {CompanyComponent} from './company/company.component';
import {UserprofileComponent} from './userprofile/userprofile.component';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {DetailModalComponent} from './detail-modal/detail-modal.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ProductComponent} from './product/product.component';
import {ConventionComponent} from './convention/convention.component';
import {BottomSheetOverviewExampleSheet} from './bottom-sheet/bottom-sheet.component';
import {ApplicationComponent} from './application/application.component';
import {ResetpasswordconfrimComponent} from './resetpasswordconfrim/resetpasswordconfrim.component';
import {NgxCaptchaModule} from 'ngx-captcha';
import {GoTopButtonModule} from 'ng2-go-top-button';
import {SendcodeComponent} from './sendcode/sendcode.component';
import {FactorComponent} from './factor/factor.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as moment from 'jalali-moment';
import {Platform} from '@angular/cdk/platform';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

export class CustomDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string) {
    super(matDateLocale, new Platform());
  }

  format(date: Date, displayFormat: object): string {
    return moment(date.toDateString()).locale('fa').format('YYYY/MM/DD');
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CarouselComponent,
    OfferComponent,
    FooterComponent,
    ContactusComponent,
    AboutusComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginModalComponent,
    SearchComponent,
    ProductDetailComponent,
    ShoppingCardComponent,
    SidenavComponent,
    JalaliPipe,
    Page404Component,
    CategoriesComponent,
    CompanyComponent,
    UserprofileComponent,
    DetailModalComponent,
    BottomSheetOverviewExampleSheet,
    ProductComponent,
    ConventionComponent,
    ApplicationComponent,
    ResetpasswordconfrimComponent,
    SendcodeComponent,
    FactorComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    BrowserAnimationsModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    InfiniteScrollModule,
    CountdownTimerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxMDhL_KXYIE_O7Ga8iIpqexZZfUO2ePI'
    }),
    NgxGalleryModule,
    ShareButtonModule,
    ScrollingModule,
    DragDropModule,
    CdkTableModule,
    CdkTreeModule,
    MatTabsModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatMenuModule,
    NgxCaptchaModule,
    GoTopButtonModule,

  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fa-IR'},
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, DetailModalComponent, BottomSheetOverviewExampleSheet]
})
export class AppModule {
}

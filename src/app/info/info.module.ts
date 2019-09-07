import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
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
  MatTabsModule,
  NativeDateAdapter,
} from "@angular/material";


import {MatDialogModule} from "@angular/material/dialog";

import {ClipboardModule} from 'ngx-clipboard';

import {ToastrModule} from 'ngx-toastr';

import {CountdownTimerModule} from 'ngx-countdown-timer';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InfoRoutingModule} from './info-routing.module';
import {AboutusComponent} from "./aboutus/aboutus.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ContactusComponent} from "./contactus/contactus.component";
import {FactorComponent} from "./factor/factor.component";
import {SearchComponent} from "./search/search.component";
import {SendcodeComponent} from "./sendcode/sendcode.component";
import {ShoppingCardComponent} from "./shopping-card/shopping-card.component";
import {UserprofileComponent} from "./userprofile/userprofile.component";
import {NgtUniversalModule} from "@ng-toolkit/universal";
import {TransferHttpCacheModule} from "@nguniversal/common";
import {HttpClientModule} from "@angular/common/http";
import {ShareButtonModule} from "@ngx-share/button";
import {NgxSpinnerModule} from "ngx-spinner";
import {NgxCaptchaModule} from "ngx-captcha";
import {Platform} from '@angular/cdk/platform';
import {GoTopButtonModule} from "ng2-go-top-button";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../../environments/environment";
import {SharedModule} from "../shared/shared.module";
import {AgmCoreModule} from "@agm/core";
import * as moment from 'jalali-moment';
import {NgxGalleryModule} from "ngx-gallery";

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
    var faDate = moment(date.toDateString()).locale('fa').format('YYYY/MM/DD');
    return faDate;
  }
}

@NgModule({
  declarations: [
    AboutusComponent,
    CategoriesComponent,
    ContactusComponent,
    FactorComponent,
    SearchComponent,
    SendcodeComponent,
    ShoppingCardComponent,
    UserprofileComponent,

  ],
  imports: [
    InfoRoutingModule,
    CommonModule,
    NgtUniversalModule,

    TransferHttpCacheModule,

    SharedModule,
    FormsModule,
    HttpClientModule,
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
    NgxGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxMDhL_KXYIE_O7Ga8iIpqexZZfUO2ePI'
    }),
    ClipboardModule,
    ToastrModule.forRoot(),
    InfiniteScrollModule,
    CountdownTimerModule.forRoot(),
    ShareButtonModule,
    MatTabsModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatMenuModule,
    NgxCaptchaModule,
    GoTopButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fa-IR'},
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ],
})
export class InfoModule {
}

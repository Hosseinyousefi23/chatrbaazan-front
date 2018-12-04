import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ngx-owl-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatSidenavModule,
  MatRadioModule,
  MatFormFieldModule, 
  } from "@angular/material";

import {  MatDialogModule,MatDialogRef,MatDialog} from "@angular/material/dialog";

import { ClipboardModule } from 'ngx-clipboard';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OfferComponent } from './offer/offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AgmCoreModule } from '@agm/core';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';



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
    MatTabsModule,
    MatSidenavModule,
    MatDialogModule,
    MatRadioModule,
    NgbModule.forRoot(),
    OwlModule,
    BrowserAnimationsModule,
    ClipboardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxMDhL_KXYIE_O7Ga8iIpqexZZfUO2ePI'
    })

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent]
})
export class AppModule { }

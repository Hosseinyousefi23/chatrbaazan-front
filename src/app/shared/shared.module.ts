import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from "./sidenav/sidenav.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
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
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from "@angular/material";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import {JalaliPipe} from "./pipe/jalali.pipe";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [SidenavComponent, HeaderComponent, FooterComponent, LoginModalComponent, JalaliPipe, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatRadioModule,
    MatStepperModule,
    MatListModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [SidenavComponent, HeaderComponent, FooterComponent, LoginModalComponent, JalaliPipe, LoadingSpinnerComponent],
  entryComponents: [LoginModalComponent],
})
export class SharedModule {
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../page.service';
import { Cities } from '../cities';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PageService,],
  entryComponents: [LoginModalComponent]
})
export class HeaderComponent implements OnInit {

  // countryForm: FormGroup;
  selectedcity;
  public cities: Cities[] = [];
  public categories: any[] = [];
  countries = ['USA', 'Canada', 'Uk', 'kashan']

  searchTerm: FormControl = new FormControl();
  myBooks = <any>[];
  @Output() cityevent =new EventEmitter<string>();
  constructor(private data: PageService, private dialog: MatDialog, private user: UsersService, private router: Router) { }

  ngOnInit() {
    this.data.getcities().subscribe((data: any) => { this.cities = data.data; });
    this.data.getCategories().subscribe((data: any) => { this.categories = data.data; });
    // this.user.logged().subscribe(data => { if(data['token']){this.logged = true}} );

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.data.search(term).subscribe(
            data => {
              // console.log(data)
              this.myBooks = data['results'] as any[];
              //console.log(data[0].BookName);
            })
        }
      })
  }

  CityChange(a){
    console.log(a)
    // this.city = a;
    this.cityevent.emit(a)
  }

  loggedin() {
    return localStorage.getItem("userToken");
  }

  logout() {
    this.user.logout()
    this.router.navigate(['/'])
  }
  @Output() navToggle = new EventEmitter<boolean>();
  navOpen() {
    this.navToggle.emit(true);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = "rtl";
    this.dialog.open(LoginModalComponent, dialogConfig);
  }

  formsubmit(search) {
    if (this.searchTerm.value) {
      // console.log(this.searchTerm.value)
      this.router.navigate(['/search'],{ queryParams: { search: this.searchTerm.value }})
    }
  }
}

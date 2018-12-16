import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../page.service';
import { Cities } from '../cities';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  selected = 'none_city';
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
    if(localStorage.getItem("userToken")){
    this.user.logged().subscribe(
      data => {
        localStorage.setItem('userToken',data['token'])
      },
      err => {
        console.log(err)
        localStorage.removeItem('userToken')
        this.router.navigate(['/']);
        // console.log("error")
      }
    );
    }

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.data.search(term).subscribe(
            data => {
              this.myBooks = data['results'] as any[];
            })
        }
      })
      
  }

  CityChange(city){
    if(city=='none_city'){
     this.cityevent.emit('')
    }
    else{
      this.cityevent.emit(city)
    }
  }

  loggedin() {
    return localStorage.getItem("userToken");
  }

  logout() {
    this.user.logout().subscribe(data => { localStorage.removeItem("userToken");
    
    })
    this.router.navigate(['/']);
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

  formsubmit() {
    if (this.searchTerm.value) {
      this.router.navigate(['/search'],{ queryParams: { search: this.searchTerm.value }})
    }
  }
}

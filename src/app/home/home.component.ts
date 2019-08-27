import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PageService} from '../page.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode = new FormControl('over');

  cityHeaderinhome = '';
  // showapllication = true;
  displayedColumns: string[] = ['prod_name', 'prod_price'];
  slider: any[] = [];
  banner1: any[] = [];
  banner2: any[] = [];
  banner3: any[] = [];
  public categories: any[] = [];
  public all_chatrbazi;

  isLoadingResults = true;

  constructor(private data: PageService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    // this.api.getHomeDetails()
    // .subscribe((res: any) => {
    //   this.data = res.data;
    //   console.log(typeof(res.data));
    //   this.isLoadingResults = false;
    // }, err => {
    //   console.log(err);
    //   this.isLoadingResults = false;
    // });
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    // this.data.getCategories().subscribe((data: any) => {
    //   this.categories = data.data;
    //   this.all_chatrbazi = data.all_chatrbazi
    // });
    this.data.getbanner().subscribe((data: any) => {
      this.slider = data.data;
      for (let i of this.slider) {
        if (!i.is_slider) {
          // if (i.location == '1') {
          //   this.banner3.push(i.image);
          //   this.banner3.push(i.link);
          // }
          if (i.location == '2') {
            this.banner2.push(i.image);
            this.banner2.push(i.link);
          }
          else if (i.location == '3') {
            this.banner1.push(i.image);
            this.banner1.push(i.link);
          }
        }
      }
    });
  }

  citychangedinheader(a) {
    this.cityHeaderinhome = a;
  }

  // showapplicationfunc(a){
  //   this.showapllication = a;
  // }
}

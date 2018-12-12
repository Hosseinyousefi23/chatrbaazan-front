import { Component, OnInit, Type, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ServerResponse } from '../ServerResponse';
import {FormControl} from '@angular/forms';
import { PageService } from '../page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode = new FormControl('over');

  cityHeaderinhome = '';

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  slider: any[] = [];
  banner: any[] = [];
  isLoadingResults = true;
  constructor(private data: PageService) { }

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
    this.data.getbanner().subscribe((data :any) => {this.slider = data.data;
      for (let i of this.slider){ 
        if(!i.is_slider){
        // console.log(i.image)
      this.banner.push(i.image);
        }
      }  
    });
  }

  citychangedinheader(a){
    console.log(a)
    this.cityHeaderinhome =a;
  }

}

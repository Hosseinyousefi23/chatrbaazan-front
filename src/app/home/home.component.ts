import { Component, OnInit, Type } from '@angular/core';
import { ApiService } from '../api.service';
import { ServerResponse } from '../ServerResponse';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode = new FormControl('over');
  mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);

  myCarouselImages =[1,2,3,4,5,6].map((i)=>`https://picsum.photos/640/480?image=${i}`);

  mySlideOptions={items: 1, dots: true, nav: true, rtl:true,};
  myCarouselOptions={items: 3, dots: true, nav: true,rtl:true,};

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: any[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getHomeDetails()
    .subscribe((res: any) => {
      this.data = res.data;
      console.log(typeof(res.data));
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}

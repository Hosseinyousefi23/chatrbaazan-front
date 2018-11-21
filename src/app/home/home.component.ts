import { Component, OnInit, Type } from '@angular/core';
import { ApiService } from '../api.service';
import { ServerResponse } from '../ServerResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

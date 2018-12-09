import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../page.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Categoryid;
  pro;
  companies :any[] =[];
  categories :any[] =[];
  mode = new FormControl('over');
  constructor(private router: Router ,private route: ActivatedRoute,private data: PageService) {
    router.events.subscribe((val) => {
      this.detectUrl()
  });
   }

  ngOnInit() {
    this.detectUrl()
  }


  detectUrl(){
    if(this.router.url.slice(1,9)=='category'){
      this.route.params.subscribe(params => { this.Categoryid = params['id'];})
      this.data.searchbyCategory(this.Categoryid).subscribe(param => { 
        if(param['data']){
          this.pro = param['data']
        }else{
        this.router.navigate(['/']);
      }
      });
    }
    else if(this.router.url.slice(1,8)=='company'){
      this.route.params.subscribe(params => { this.Categoryid = params['id'];})
      this.data.searchbyCompany(this.Categoryid).subscribe(param => { 
        if(param['data']){
          this.pro = param['data']
          // this.companies =[]
          // this.companies.push(this.pro.results[0].city)
        }else{
        this.router.navigate(['/']);
      }
      });
    }
  }
}

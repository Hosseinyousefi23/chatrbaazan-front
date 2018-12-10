import { Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { PageService } from '../page.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  Categoryid;
  pro = null;
  companies :any[] =[];
  categories :any[] =[];
  mode = new FormControl('over');                                                                                                                                                                                                                                                    
  constructor(private router: Router ,private route: ActivatedRoute,private data: PageService) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
      }
      this.ngOnInit()
    });
   }

  ngOnInit() {
    let sea = this.route.snapshot.queryParams['search']
      this.data.search(sea).subscribe(param => { 
        if(param['count']){
          // console.log(param)
          this.pro = param
          this.companies =[]
          for(let i of param.results){
          
          // this.companies =[]
          this.companies = this.companies.concat(i.company); 
          
          console.log(this.companies)
          }
          for(let i of param.results){
          
          // this.companies =[]
          this.categories = this.categories.concat(i.category); 
          
          console.log(this.companies)
          }
          // console.log(this.companies)
        }else{
          this.pro =null;
      }
      });
  }


  // detectUrl(){
  //   let url =this.router.url
  //   if(url.slice(1,9)=='category'){
  //     this.route.params.subscribe(params => { this.Categoryid = params['id'];})
  //     this.data.searchbyCategory(this.Categoryid).subscribe(param => { 
  //       if(param['data']){
  //         this.pro = param['data']
  //       }else{
  //       this.router.navigate(['/']);
  //     }
  //     });
  //   }
  //   else if(url.slice(1,7)=='search'){
  //     let sea = this.route.snapshot.queryParams['search']
  //     this.data.search(sea).subscribe(param => { 
  //       // console.log(param)
  //       if(param['count']){
  //         // console.log(param)
  //         this.pro = param
  //         this.companies =[]
  //         for(let i of param.results){
          
  //         // this.companies =[]
  //         this.companies = this.companies.concat(i.company); 
          
  //         console.log(this.companies)
  //         }
  //         for(let i of param.results){
          
  //         // this.companies =[]
  //         this.categories = this.categories.concat(i.category); 
          
  //         console.log(this.companies)
  //         }
  //         // console.log(this.companies)
  //       }else{
  //         this.pro =null;
  //     }
  //     });
  //   }
  //   else if(url.slice(1,8)=='company'){
  //     this.route.params.subscribe(params => { this.Categoryid = params['id'];})
  //     this.data.searchbyCompany(this.Categoryid).subscribe(param => { 
  //       if(param['data']){
  //         this.pro = param['data']
  //         // this.companies =[]
  //         // this.companies.push(this.pro.results[0].city)
  //       }else{
  //       this.router.navigate(['/']);
  //     }
  //     });
  //   }

  // }

}

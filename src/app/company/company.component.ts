import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private route: ActivatedRoute , private router : Router,private data :PageService) { }
  pro;
  selectedcategory;
  categories : any[] =[];
  Companyid :any[] =[];
  mode = new FormControl('over');
  ngOnInit() {
    this.route.params.subscribe(params => { this.Companyid = params['slug'];})
    this.data.search(this.Companyid).subscribe(param => { 
      if(param['count']){
        this.pro = param
        this.categories =[]
        for(let i of param.results){
        this.categories = this.categories.concat(i.category); 
        }
      }else{
      this.router.navigate(['/']);
    }
    });
  }

  filter(){
    this.data.search(null,,this.Companyid,this.selectedcategory).subscribe(param => { 
      if(param['count']){
        this.pro = param
        this.categories =[]
        for(let i of param.results){
        this.categories = this.categories.concat(i.category); 
        }
      }else{
        this.pro =null;
    }
    });
  }

}

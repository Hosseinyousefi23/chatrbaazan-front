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
  Companyid :any[] =[];
  mode = new FormControl('over');
  ngOnInit() {
    this.route.params.subscribe(params => { console.log(params['slug']); this.Companyid = params['slug'];})
    this.data.searchbyCompany(this.Companyid).subscribe(param => { 
      if(param['data']){
        this.pro = param['data']
      }else{
      this.router.navigate(['/']);
    }
    });
  }

}

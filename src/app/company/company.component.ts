import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private route: ActivatedRoute , private router : Router,private data :PageService, private dialog: MatDialog) { }
  pro;
  selectedcategory;
  selectedtab: string;
  cityHeader ;

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

  citychangedinheader(a) {
    this.cityHeader = a;
    this.filter();
  }

  changeTab($event){
    let tab = ['favorites','topchatrbazi','created_at']
    this.selectedtab =tab[$event.index];
    this.filter();
}

  filter(){
    this.data.search(null,this.Companyid,this.selectedcategory,this.selectedtab,this.cityHeader).subscribe(param => { 
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

  openDialog(slug) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = "rtl";
    this.dialog.open(DetailModalComponent, {
      direction: 'rtl',
      data:{ 'slug': slug}
    });
}
}

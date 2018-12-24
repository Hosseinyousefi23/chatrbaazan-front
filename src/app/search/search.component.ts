import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { PageService } from '../page.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { last } from '@angular/router/src/utils/collection';
// import * as _ from 'l'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pro : any[] = [];
  searched: string;
  selectedcompany;
  selectedcategory;
  selectedtab: string;
  cityHeader = '';

  next_url = '';
  size = 4;
  page = 1;
  finished = false
  
  companies: any[] = [];
  categories: any[] = [];
  mode = new FormControl('over');
  constructor(private router: Router, private route: ActivatedRoute, private data: PageService, private dialog: MatDialog) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
      }
      this.ngOnInit()
    });
  }

  openDialog(slug) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = "rtl";
    this.dialog.open(DetailModalComponent, {
      direction: 'rtl',
      data: { 'slug': slug }
    });
  }
  ngOnInit() {
    this.searched = this.route.snapshot.queryParams['search']
    this.data.search(this.searched,null,null,null,null,this.size).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.next_url = param.next
        this.companies = []
        this.categories = []
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
            }
          }
          // console.log(this.companies)
        }
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        // console.log(this.companies)
      } else {
        this.pro = null;
      }
    });
  }
  changeTab($event) {
    let tab = ['favorites', 'topchatrbazi', 'created_at']
    this.selectedtab = tab[$event.index];
    this.page = 1;
    this.filter();
  }

  citychangedinheader(a) {
    this.cityHeader = a;
    this.page = 1;
    this.filter();
  }

  filterbtn(){
    this.page = 1;
    this.filter();
  }

  filter() {
    this.data.search(this.searched, this.selectedcompany, this.selectedcategory, this.selectedtab, this.cityHeader,this.size,this.page).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.companies = []
        this.categories = []
        this.next_url = param.next
        for (let i of param.results) {
          // this.companies =[]
          for (let c of i.company) {
            // console.log(this.companies.indexOf(c))
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
            }
          }
        }
        for (let i of param.results) {
          // this.companies =[]
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
      } else {
        this.pro = null;
      }
    });
  }


  infinte_list() {
    if(this.next_url != null){
    this.data.search(this.searched, this.selectedcompany, this.selectedcategory, this.selectedtab, this.cityHeader,this.size,this.page).subscribe(param => {
      if (param['count']) {
        // console.log(param.results)
        this.pro = this.pro.concat(param['results'])
        this.next_url = param.next
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
            }
          }
        }
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
      } else {
        this.pro = null;
      }
    });
  }
  }


  onScroll() {
    console.log(this.next_url)
    if(this.next_url){
    this.page += 1; 
    this.infinte_list();
    // console.log(this.next_url)
    // console.log(this.page)
    }
  }

}

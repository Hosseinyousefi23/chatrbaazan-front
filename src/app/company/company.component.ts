import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

declare var $: any;
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../sharesCss/shared_style.css','./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private data: PageService, private dialog: MatDialog) { }
  pro : any[] = [];
  selectedcategory;
  selectedtab: string;
  cityHeader;
  companyinfo;


  next_url = '';
  size = 4;
  page = 1;

  categories: any[] = [];
  Companyid: any[] = [];
  mode = new FormControl('over');
  ngOnInit() {

    this.route.params.subscribe(params => { this.Companyid = params['slug']; })
    this.data.search(null, this.Companyid,null,null,null,this.size).subscribe(param => {
      if (param['count']) {

        this.pro = param.results;
        this.companyinfo = param['dataCompany']
        this.categories = []
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  addeventlister(){
    $(document).ready(function(){
      $(".card").click(function(){
        $(".card").removeClass("voted");
        $(this).addClass("voted");
        $(".card").find(".offer_image").css("display","block")
        $(this).find(".offer_image").css("display","none")

      });

      $(".back_voted").click(function(e){
        $(".offer_image").css("display","block")
        e.stopPropagation();
        $(".card").removeClass("voted");
      });

    });
  }

  citychangedinheader(a) {
    this.cityHeader = a;
    this.page = 1;
    this.filter();
  }

  changeTab($event) {
    let tab = ['favorites', 'topchatrbazi', 'created_at']
    this.selectedtab = tab[$event.index];
    this.page = 1;
    this.filter();
  }

  filterbtn(){
    this.page = 1;
    this.filter();
  }
  
  filter() {
    this.data.search(null, this.Companyid, this.selectedcategory, this.selectedtab, this.cityHeader,this.size, this.page).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.categories = []
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
      } else {
        this.pro = null;
      }
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

  infinte_list() {
    this.data.search(null, this.Companyid, this.selectedcategory, this.selectedtab, this.cityHeader, this.size, this.page).subscribe(param => {
      if (param['count']) {
        console.log(param.results)
        this.pro = this.pro.concat(param['results'])
        this.next_url = param.next
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
      } else {
        this.pro = null;
      }
    });
  }


  onScroll() {
    this.page += 1;
    this.infinte_list();
    // console.log(this.next_url)
    // console.log(this.page)
  }


  finished(a){
    $(".timer_"+a).text("منقضی شد")
  }

}

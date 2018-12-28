import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PageService } from '../page.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { BottomSheetOverviewExampleSheet } from '../bottom-sheet/bottom-sheet.component';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../sharesCss/shared_style.css','./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  pro : any[] = [];
  selectedcompany;
  selectedtab: string;
  cityHeader = '';


  next_url = '';
  size = 1;
  page = 1;

  companies: any[] = [];
  Categoryid: any[] = [];
  mode = new FormControl('over');
  constructor(private route: ActivatedRoute, private router: Router, private data: PageService, private dialog: MatDialog,
    private toastr: ToastrService,private bottomSheet: MatBottomSheet) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => { this.Categoryid = params['slug']; })
    this.data.search(null, null, this.Categoryid,null,null,this.size).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.companies = []
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
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
  
  filterDeletebtn(){
    this.page = 1;
    this.selectedcompany = null;
    this.filter();
  }

  filter() {
    this.data.search(null, this.selectedcompany, this.Categoryid, this.selectedtab, this.cityHeader,this.size, this.page).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.companies = []
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
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
    this.data.search(null, this.selectedcompany, this.Categoryid, this.selectedtab, this.cityHeader, this.size, this.page).subscribe(param => {
      if (param['count']) {
        console.log(param.results)
        this.pro = this.pro.concat(param['results'])
        this.next_url = param.next
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
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

  sendfail(slug){
    this.toastr.error('چترتون مستدام ')
    this.data.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      ,{data:{ 'slug': slug}});
  }

  showCopied(product_id) {
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
    $(".Copy_btn").text("کپی شد")
    setTimeout( function(){ 
      $(".Copy_btn").text("کپی")
    }  , 3000 );
  }

  finished(a){
    $(".timer_"+a).text("منقضی شد")
  }

}

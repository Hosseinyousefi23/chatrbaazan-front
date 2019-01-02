import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { PageService } from '../page.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { BottomSheetOverviewExampleSheet } from '../bottom-sheet/bottom-sheet.component';

declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../sharesCss/shared_style.css','./search.component.css']
})
export class SearchComponent implements OnInit {
  pro : any[] = [];
  searched: string;
  selectedcompany;
  selectedcategory;
  selectedtab: string;
  cityHeader = '';
  type = 4;

  next_url = '';
  size = 4;
  page = 1;
  
  companies: any[] = [];
  categories: any[] = [];
  mode = new FormControl('over');
  constructor(private router: Router, private route: ActivatedRoute, private data: PageService, private dialog: MatDialog,
    private toastr: ToastrService,private bottomSheet: MatBottomSheet) {
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
    this.route.params.subscribe(params => {this.type = params['type'];})
    this.searched = this.route.snapshot.queryParams['search']
    this.data.search(this.searched,null,null,null,null,this.size,null,this.type).subscribe(param => {
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
        }
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

  filterDeletebtn(){
    this.page = 1;
    this.selectedcategory =null;
    this.selectedcompany = null;
    this.filter();
  }


  filter() {
    this.data.search(this.searched, this.selectedcompany, this.selectedcategory, this.selectedtab, this.cityHeader,this.size,this.page,this.type).subscribe(param => {
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
        this.addeventlister();
      } else {
        this.pro = null;
      }
    });
  }


  infinte_list() {
    if(this.next_url != null){
    this.data.search(this.searched, this.selectedcompany, this.selectedcategory, this.selectedtab, this.cityHeader,this.size,this.page,this.type).subscribe(param => {
      if (param['count']) {
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
        this.addeventlister();
      } else {
        this.pro = null;
      }
    });
  }
  }
  sendfail(slug){
    this.toastr.error('چترتون مستدام ')
    this.data.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  sendclick(product_id){
    // this.toastr.info('آماده پرتاب')
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      ,{data:{ 'slug': slug}});
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


  finished(a){
    // $(".timer_"+a).text("منقضی شد")
    $(".timer_"+a).html('<p style="color:red;">منقضی شد</p>')
  }

}

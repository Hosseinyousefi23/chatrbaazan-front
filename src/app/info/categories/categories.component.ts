import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {MatBottomSheet, MatDialog, MatDialogConfig} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {PageService} from "../../page.service";
import {DetailModalComponent} from "../../detail-modal/detail-modal.component";
import {BottomSheetOverviewExampleSheet} from "../../bottom-sheet/bottom-sheet.component";
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../sharesCss/shared_style.css', './categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  category_verbose = "";
  pro: any[] = [];
  selectedcompany;
  selectedtab: string;
  cityHeader = '';
  url = '';

  next_url = '';
  size = 4;
  page = 1;
  stop_scroll = false;

  companies: any[] = [];
  Categoryid: any[] = [];
  mode = new FormControl('over');

  constructor(private route: ActivatedRoute, private router: Router, private data: PageService, private dialog: MatDialog,
              private toastr: ToastrService, private bottomSheet: MatBottomSheet, private titleService: Title) {

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

    this.route.params.subscribe(params => {
      this.Categoryid = params['slug'];
    })
    this.data.search(null, null, this.Categoryid, null, null, this.size).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.companies = []
        this.next_url = param.next
        this.category_verbose = param.category;
        this.titleService.setTitle("کد تخفیف " + this.category_verbose);
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
            }
          }
        }
        this.addeventlister();
        if (this.next_url != null) {
          this.stop_scroll = false;
        } else {
          this.stop_scroll = true;
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle("اشتراک گذاری کد تخفیف و کوپن فروشگاه ها خدمات آنلاین | چتربازان");
  }

  addeventlister() {
    $(document).ready(function () {
      $(".card").click(function () {
        $(".card").removeClass("voted");
        $(this).addClass("voted");
        $(".card").find(".offer_image").css("display", "block")
        $(this).find(".offer_image").css("display", "none")

      });

      $(".back_voted").click(function (e) {
        $(".offer_image").css("display", "block")
        e.stopPropagation();
        $(".card").removeClass("voted");
      });

      $(".Copy_btn").click(function () {
        $(this).text("کپی شد");
        setTimeout(function () {
          $(".Copy_btn").text("کپی")
        }, 500);
      })

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

  filterbtn() {
    this.page = 1;
    this.filter();
  }

  filterDeletebtn() {
    this.page = 1;
    this.selectedcompany = null;
    this.filter();
  }

  filter() {
    this.data.search(null, this.selectedcompany, this.Categoryid, this.selectedtab, this.cityHeader, this.size, this.page).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.companies = []
        this.next_url = param.next
        for (let i of param.results) {
          for (let c of i.company) {
            if (!this.companies.some(temp => temp.name == c.name)) {
              this.companies.push(c);
            }
          }
        }
        this.addeventlister();
        if (this.next_url != null) {
          this.stop_scroll = false;
        } else {
          this.stop_scroll = true;
        }
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
      data: {'slug': slug}
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
        if (this.next_url != null) {
          this.stop_scroll = false;
        } else {
          this.stop_scroll = true;
        }
      } else {
        this.pro = null;
      }
    });
  }


  onScroll() {
    if (!this.stop_scroll) {
      this.page += 1;
      this.infinte_list();
      this.stop_scroll = true;
    }
  }

  sendfail(slug) {
    this.toastr.error('چترتون مستدام ')
    this.data.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      , {data: {'slug': slug}});
  }

  showCopied(product_id) {
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  finished(a) {
    // $(".timer_"+a).text("منقضی شد")
    $(".timer_" + a).html('<p style="color:red;">منقضی شد</p>')
  }

  sendclick(product_id) {
    // this.toastr.info('آماده پرتاب')
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

}

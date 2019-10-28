import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PageService} from '../page.service';
import {FormControl} from '@angular/forms';
import {MatBottomSheet, MatDialog, MatDialogConfig} from '@angular/material';
import {DetailModalComponent} from '../detail-modal/detail-modal.component';
import {ToastrService} from 'ngx-toastr';
import {BottomSheetOverviewExampleSheet} from '../bottom-sheet/bottom-sheet.component';
import {UsersService} from '../users.service';
import {Title} from "@angular/platform-browser";
import {Tab} from "../Tab";

declare var $: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../sharesCss/shared_style.css', './company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {
  company_slug = this.route.snapshot.paramMap.get("slug");
  size = 8;
  tabs: Tab[] = [
    {
      name: "تازه ترین‎ها",
      term: null,
      company: this.company_slug,
      category: null,
      ordering: "created_at",
      city: null,
      limit: this.size,
      page: 1,
      type: null,
      expire: false,
      has_next: false,
      content: []
    },
    {
      name: "بیشترین تخفیف",
      term: null,
      company: this.company_slug,
      category: null,
      ordering: "topchatrbazi",
      city: null,
      limit: this.size,
      page: 1,
      type: null,
      expire: false,
      has_next: false,
      content: []
    },
    {
      name: "محبوب ترین‎ها",
      term: null,
      company: this.company_slug,
      category: null,
      ordering: "favorites",
      city: null,
      limit: this.size,
      page: 1,
      type: null,
      expire: false,
      has_next: false,
      content: []
    }
  ];

  expired_tab: Tab[] = [
    {
      name: "منقضی شده‎ها",
      term: null,
      company: this.company_slug,
      category: null,
      ordering: "expired",
      city: null,
      limit: this.size,
      page: 1,
      type: null,
      expire: true,
      has_next: false,
      content: []
    }
  ];

  pro: any[] = [];
  expired: any[] = [];
  selectedcategory;
  selectedtab: string;
  cityHeader;
  companyinfo;


  next_url_pro = '';
  next_url_exp = '';

  page_pro = 1;
  page_exp = 1;
  stop_scroll_pro = false;
  stop_scroll_exp = false;

  categories: any[] = [];

  mode = new FormControl('over');

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private route: ActivatedRoute, private router: Router, private data: PageService, private user: UsersService, private dialog: MatDialog, private toastr: ToastrService,
              private bottomSheet: MatBottomSheet, private titleService: Title) {
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
    this.companyinfo = {
      name: '',
      description: '',
      link: '',
      image: '',
    }
    // this.route.params.subscribe(params => {
    //   this.Companyid = params['slug'];
    // })
    this.data.search(null, this.company_slug, null, null, null, this.size, this.page_pro, null, this.selectedtab == 'expired').subscribe(param => {
      // if (param['count']) {

      this.pro = param.results;
      this.companyinfo = param['dataCompany']
      this.titleService.setTitle("کد تخفیف " + this.companyinfo.name + " | " + "چتربازان");
      this.next_url_pro = param.next
      this.categories = []
      for (let i of param.results) {
        for (let c of i.category) {
          if (!this.categories.some(temp => temp.name == c.name)) {
            this.categories.push(c);
          }
        }
      }
      this.addeventlister();
      if (this.next_url_pro != null) {
        this.stop_scroll_pro = false;
      } else {
        this.stop_scroll_pro = true;
      }
      // } else {
      //   this.router.navigate(['/']);
      // }
    });
    this.data.search(null, this.company_slug, null, 'expired', null, this.size, this.page_exp, null, true).subscribe(param => {
      // if (param['count']) {

      this.expired = param.results;
      this.next_url_exp = param.next;
      this.addeventlister();
      if (this.next_url_exp != null) {
        this.stop_scroll_exp = false;
      } else {
        this.stop_scroll_exp = true;
      }
      // }
      // } else {
      //   this.router.navigate(['/']);
      // }
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
    this.page_pro = 1;
    this.filter();
  }

  changeTab($event) {
    let tab = ['favorites', 'topchatrbazi', 'created_at'];
    this.selectedtab = tab[$event.index];
    this.page_pro = 1;
    this.filter();
  }

  addtocart(id) {
    if (this.localStorage.getItem("userToken")) {
      this.user.addtocart(id).subscribe(
        (data: any) => {
          // console.log(data)
          if (data.count && data.count >= 0) {
            this.toastr.success('به سبد خرید اضافه شد.')
          } else {
            // #TODO Handle Error Add To Cart
          }
        }
      )
    } else {
      this.toastr.info('ابتدا وارد سایت شوید !!')
    }
  }

  filterbtn() {
    this.page_pro = 1;
    this.filter();
  }

  filterDeletebtn() {
    this.page_pro = 1;
    this.selectedcategory = null;
    this.filter();
  }

  filter() {
    this.data.search(null, this.company_slug, this.selectedcategory, this.selectedtab, this.cityHeader, this.size, this.page_pro, null, this.selectedtab == 'expired').subscribe(param => {
      if (param['count']) {
        this.pro = param.results;
        this.categories = [];
        this.next_url_pro = param.next;
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
        if (this.next_url_pro != null) {
          this.stop_scroll_pro = false;
        } else {
          this.stop_scroll_pro = true;
        }
      }
      // } else {
      //   this.pro = null;
      // }
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

  infinte_list_pro() {
    this.data.search(null, this.company_slug, this.selectedcategory, this.selectedtab, this.cityHeader, this.size, this.page_pro, null, this.selectedtab == 'expired').subscribe(param => {
      if (param['count']) {
        console.log(param.results)
        this.pro = this.pro.concat(param['results'])
        this.next_url_pro = param.next
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
        if (this.next_url_pro != null) {
          this.stop_scroll_pro = false;
        } else {
          this.stop_scroll_pro = true;
        }
      } else {
        this.pro = null;
      }
    });
  }

  infinte_list_exp() {
    this.data.search(null, this.company_slug, this.selectedcategory, 'expired', this.cityHeader, this.size, this.page_exp, null, true).subscribe(param => {
      if (param['count']) {
        this.expired = this.expired.concat(param['results'])
        this.next_url_exp = param.next
        this.addeventlister();
        if (this.next_url_exp != null) {
          this.stop_scroll_exp = false;
        } else {
          this.stop_scroll_exp = true;
        }
      } else {
        this.expired = null;
      }
    });
  }


  onScroll() {
    if (!this.stop_scroll_pro) {
      this.page_pro += 1;
      this.infinte_list_pro();
      this.stop_scroll_pro = true;
    }
    if (!this.stop_scroll_exp) {
      this.page_exp += 1;
      this.infinte_list_exp();
      this.stop_scroll_exp = true;
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

  sendclick(product_id) {
    this.toastr.info('آماده پرتاب')
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  finished(a) {
    // $(".timer_"+a).text("منقضی شد")
    $(".timer_" + a).html('<p style="color:red;">منقضی شد</p>')
  }

}

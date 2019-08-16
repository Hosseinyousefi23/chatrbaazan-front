import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {BottomSheetOverviewExampleSheet} from '../bottom-sheet/bottom-sheet.component';
import {MatBottomSheet, MatTabChangeEvent} from '@angular/material';
import {PageService} from '../page.service';
import {UsersService} from '../users.service';
import {ToastrService} from 'ngx-toastr';


declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css', '../sharesCss/shared_style.css']
})
export class ProductComponent implements OnInit {
  public mostseen: any[] = [];
  public newest: any[] = [];
  public mostDiscount: any[] = [];

  // @Output() showCompo =new EventEmitter<boolean>();
  showDiv = false;
  @Input() cityHeader: string;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private offer: PageService, private user: UsersService, private toastr: ToastrService,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.searchoffer_newest();
  }

  // ngOnChanges() {
  //   this.searchoffer();
  // }
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

  selectTab(event: MatTabChangeEvent) {
    if (event.index == 0) {
      if (!this.newest) {
        this.searchoffer_newest();
      }
    } else if (event.index == 1) {
      if (this.mostDiscount.length == 0) {
        this.searchoffer_mostDiscount();
      }

    } else if (event.index == 2) {
      if (this.mostseen.length == 0) {
        this.searchoffer_mostseen();
      }
    }
    this.addeventlister();
  }

  searchoffer() {
    this.offer.search(null, null, null, 'favorites', this.cityHeader, '5', null, '1').subscribe((data: any) => {
      this.mostseen = data['results'];
      if (data['results'][0]) {
        this.showDiv = true
      }
      ;this.addeventlister();
    });
    this.offer.search(null, null, null, 'created_at', this.cityHeader, '5', null, '1').subscribe((data: any) => {
      this.newest = data['results'];
      this.addeventlister();
    });
    this.offer.search(null, null, null, 'topchatrbazi', this.cityHeader, '5', null, '1').subscribe((data: any) => {
      this.mostDiscount = data['results'];
      this.addeventlister();
    });
    this.addeventlister();
  }

  searchoffer_newest() {
    this.offer.search(null, null, null, 'created_at', this.cityHeader, '5', null, '1').subscribe((data: any) => {
      this.newest = data['results'];
      if (data['results'][0]) {
        this.showDiv = true
      }
      this.addeventlister();
    });
  }

  searchoffer_mostseen() {
    this.offer.search(null, null, null, 'favorites', this.cityHeader, '5', null, '1').subscribe((data: any) => {
      this.mostseen = data['results'];
      ;this.addeventlister();
    });
  }

  searchoffer_mostDiscount() {
    this.offer.search(null, null, null, 'topchatrbazi', this.cityHeader, '5', null, '1').subscribe((data: any) => {
      this.mostDiscount = data['results'];
      this.addeventlister();
    });
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

  sendfail(slug) {
    this.toastr.error('چترتون مستدام ')
    this.offer.sendfailure(slug).subscribe(
    )
  }

  sendclick(product_id) {
    // this.toastr.info('آماده پرتاب')
    this.offer.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  showCopied(product_id) {
    this.offer.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  finished(a) {
    // $(".timer_"+a).text("منقضی شد")
    $(".timer_" + a).html('<p style="color:red;">منقضی شد</p>')
  }

  openBottomSheet(slug): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      , {data: {'slug': slug}});
  }

}

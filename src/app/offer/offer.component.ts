import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {PageService} from '../page.service';
import {UsersService} from '../users.service';
import {MatBottomSheet} from '@angular/material';
import {BottomSheetOverviewExampleSheet} from '../bottom-sheet/bottom-sheet.component';

//import * from 'jquery';

declare var $: any;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css', '../sharesCss/shared_style.css']
})

export class OfferComponent implements OnInit {
  public mostseen: any[] = [];
  public newest: any[] = [];
  public mostDiscount: any[] = [];
  private limit = '20';

  showDiv = false;
  @Input() cityHeader: string;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private offer: PageService, private user: UsersService, private toastr: ToastrService,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.searchoffer();
  }

  ngOnChanges() {
    this.searchoffer();
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

  searchoffer() {
    this.offer.search(null, null, null, 'favorites', this.cityHeader, this.limit, null, '4').subscribe((data: any) => {
      this.mostseen = data['results'];
      if (data['results'][0]) {
        this.showDiv = true
      }
      ;this.addeventlister();
    });
    this.offer.search(null, null, null, 'created_at', this.cityHeader, this.limit, null, '4 ').subscribe((data: any) => {
      this.newest = data['results'];
      this.addeventlister();
    });
    this.offer.search(null, null, null, 'topchatrbazi', this.cityHeader, this.limit, null, '4').subscribe((data: any) => {
      this.mostDiscount = data['results'];
      this.addeventlister();
    });
    this.addeventlister();
  }

  date_timestamp(d) {
    let time = new Date(d);
    //console.log(time)
    // console.log(Date.now(),time.getTime());
    // console.log(Date.now()-time.getTime());
    return Date.now() - time.getTime();
  }

  addtocart(id) {
    this.offer.sendclick_like(id).subscribe(
      data => console.log(data)
    )
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
      // data => console.log(data)
    )
  }

  sendclick(product_id) {
    // this.toastr.info('آماده پرتاب')
    this.offer.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  showCopied(product_id) {
    // var target = event.target || event.srcElement || event.currentTarget;
    // var idAttr = target.attributes.class;
    // console.log(event)
    // console.log(target)
    // console.log(idAttr)
    this.offer.sendclick_like(product_id).subscribe(
      // data => console.log(data)
    )

  }

  finished(a) {
    // $(".timer_"+a).text("منقضی شد")
    $(".timer_" + a).html('<p style="color:red;">منقضی شد</p>')
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      , {data: {'slug': slug}});
  }
}

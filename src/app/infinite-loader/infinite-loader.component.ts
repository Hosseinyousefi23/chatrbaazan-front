import {Component, Inject, Input, OnInit} from '@angular/core';
import {Tab} from "../Tab";
import {PageService} from "../page.service";
import {MatBottomSheet, MatTabChangeEvent} from "@angular/material";
import {ToastrService} from "ngx-toastr";
import {BottomSheetOverviewExampleSheet} from "../bottom-sheet/bottom-sheet.component";
import {LOCAL_STORAGE} from "@ng-toolkit/universal";
import {UsersService} from "../users.service";

declare var $: any;

@Component({
  selector: 'app-infinite-loader',
  templateUrl: './infinite-loader.component.html',
  styleUrls: ['./infinite-loader.component.css', '../sharesCss/shared_style.css']
})

export class InfiniteLoaderComponent implements OnInit {

  @Input()
  private tabs: Tab[];
  private selectedTab: number = 0;

  // public spin: boolean = false;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private offer: PageService, private user: UsersService, private toastr: ToastrService, private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.searchOffer(0)
    }
  }

  searchOffer(i) {
    this.offer.search(this.tabs[i].term, this.tabs[i].company, this.tabs[i].category, this.tabs[i].ordering,
      this.tabs[i].city, this.tabs[i].limit, this.tabs[i].page, this.tabs[i].type,
      this.tabs[i].expire).subscribe((data: any) => {
      this.tabs[i].content = this.tabs[i].content.concat(data['results']);
      this.tabs[i].has_next = (data['next'] != null);

      // this.addCode(data['results']);
      this.addeventlistener();
    });
  }

  addeventlistener() {
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
    var i = event.index;
    this.selectedTab = i;
    if (!this.tabs[i].content || this.tabs[i].content.length == 0) {
      this.searchOffer(i);
    }
  }

  sendfail(slug) {
    this.toastr.error('چترتون مستدام ')
    this.offer.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  showCopied(product_id) {
    this.offer.sendclick_like(product_id).subscribe()

  }

  openBottomSheet(slug): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet, {data: {'slug': slug}});
  }

  sendclick(product_id) {
    this.offer.sendclick_like(product_id).subscribe(
      data => console.log(data)
    );
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

  onScroll() {
    console.log("scrolled");
    if (this.tabs[this.selectedTab].has_next) {
      this.tabs[this.selectedTab].page += 1;
      this.searchOffer(this.selectedTab);
    }
  }

}

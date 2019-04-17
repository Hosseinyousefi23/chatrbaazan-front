import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../page.service';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {UsersService} from '../users.service';
import {ToastrService} from 'ngx-toastr';
import {MatBottomSheet} from '@angular/material';
import {BottomSheetOverviewExampleSheet} from "../bottom-sheet/bottom-sheet.component";

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css', '../sharesCss/shared_style.css']
})
export class ProductDetailComponent implements OnInit {
  mode = new FormControl('over');
  pro;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  slug: string;
  address: object;
  number = 0;
  image_gallery: NgxGalleryImage[] = [];
  public offers_list: any[] = [];
  // public config: object = {
  //   leftTime: 23,
  //   template: '$!h!ساعت$!m!دقیقه$!s!ثانیه'
  // };

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private route: ActivatedRoute, private offer: PageService, private router: Router, private service: PageService, private user: UsersService, private toastr: ToastrService, private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.pro = {
      id: '',
      name: '',
      company: [],
      city: [],
      label: [],
      is_free: false,
      discount: '',
      expiration_date: '',
      price: '',
      chatrbazi: ''
    };
    this.searchoffer();
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
    })
    this.service.getproductByslug(this.slug).subscribe(param => {
      if (param['data']) {
        this.pro = param['data']
        if (this.pro['image']) {
          this.address = {small: this.pro['image'], medium: this.pro['image'], big: this.pro['image']};
          this.image_gallery.push(this.address)

          for (let entry of this.pro['gallery']) {
            this.address = {small: entry.image, medium: entry.image, big: entry.image};
            this.image_gallery.push(this.address)
          }
        }
        if (!this.pro['image']) {
          console.log('tessst', this.pro['company'][0]['image'])
          this.address = {
            small: this.pro['company'][0]['image'],
            medium: this.pro['company'][0]['image'],
            big: this.pro['company'][0]['image']
          };
          this.image_gallery.push(this.address)

        }

      } else {
        this.router.navigate(['/']);
      }
    });
    this.galleryOptions = [
      {
        width: '600px',
        // height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '15em',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        height: '10em',
        preview: false
      }
    ];
    // this.galleryImages = [
    //   {
    //       small: 'assets/image/contact-us-bg-banner.jpg',
    //       medium: 'assets/image/contact-us-bg-banner.jpg',
    //       big: 'assets/image/contact-us-bg-banner.jpg'
    //   },
    //   {
    //     small: 'assets/image/contact-us-bg-banner.jpg',
    //     medium: 'assets/image/contact-us-bg-banner.jpg',
    //     big: 'assets/image/contact-us-bg-banner.jpg'
    // }
    // ]
    // console.log(this.galleryImages)
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
    this.offer.search(null, null, null, 'created_at', null, '5', null, '2').subscribe((data: any) => {
      this.offers_list = data['results'];
      this.addeventlister();
    });
  }

  sendfail(slug) {
    this.toastr.error('چترتون مستدام ')
    this.service.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  showCopied() {
    $(".Copy_btn").html("کپی شد")
    setTimeout(function () {
      $(".Copy_btn").text("کپی")
    }, 500);
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

  label_clicked(label) {
    this.router.navigate(['/search'], {queryParams: {label: label}})
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      , {data: {'slug': slug}});
  }
}


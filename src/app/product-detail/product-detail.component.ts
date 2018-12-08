import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../page.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  mode = new FormControl('over');
  pro : string = '';
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  slug: string;
  address:object;
  number =0;
  image_gallery:NgxGalleryImage[]=[];

  constructor(private route: ActivatedRoute , private router : Router,private service :PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.slug = params['slug'];})
    this.service.getproductByslug(this.slug).subscribe(param => { 
      if(param['data']){
        this.pro = param['data']
        for (let entry of this.pro['gallery']) {
           this.address={small:entry.image,medium: entry.image,big: entry.image};
          this.image_gallery.push(this.address)
          
          
        }
        
      }else{
      this.router.navigate(['/']);
    }
    });
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '400px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
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

}


// (2) [{…}, {…}]
// 0:
// big: "assets/image/contact-us-bg-banner.jpg"
// medium: "assets/image/contact-us-bg-banner.jpg"
// small: "assets/image/contact-us-bg-banner.jpg"
// __proto__: Object


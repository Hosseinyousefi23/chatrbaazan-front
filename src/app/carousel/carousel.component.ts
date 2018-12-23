import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public slider: any[] = [];
  constructor( private data: PageService ) { }
  myCarouselImages :any[] = [];
  Imageslink :any[] = [];
  ngOnInit() {
    this.data.getbanner().subscribe((data :any) => {this.slider = data.data;
      for (let i of this.slider){ 
        if(i.is_slider){
      this.myCarouselImages.push(i.image);
      this.Imageslink.push(i.link);
        }
      }  
    });
  }

  myCarouselOptions={items: 1, dots: true, nav: true,rtl:true, autoplay:true, autoplayTimeout:3000,
    autoplayHoverPause:true ,loop:true};

}

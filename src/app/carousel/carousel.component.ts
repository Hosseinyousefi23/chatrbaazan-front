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

  ngOnInit() {
    this.data.getbanner().subscribe((data :any) => {this.slider = data.data;
    });
  }

  myCarouselImages = [1,2,3,4,5,6].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  myCarouselOptions={items: 1, dots: true, nav: true,rtl:true, autoplay:true, autoplayTimeout:3000,
    autoplayHoverPause:true ,loop:true};
}

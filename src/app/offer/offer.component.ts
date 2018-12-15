import { Component, OnInit, Input } from '@angular/core';
import { PageService } from '../page.service';
//import * from 'jquery';

declare var $: any;
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {
  public mostseen: any[] = [];
  public newest: any[] = [];
  public mostDiscount: any[] = [];

  @Input() cityHeader :string;
  constructor(private offer : PageService) { }
  ngOnInit() {
    this.searchoffer();
  }

  ngOnChanges() {
    this.searchoffer();
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
  searchoffer(){
    this.offer.search(null,null,null,'favorites',this.cityHeader).subscribe((data :any) => {this.mostseen = data;});
    this.offer.search(null,null,null,'created_at',this.cityHeader).subscribe((data :any) => { this.newest = data;});
    this.offer.search(null,null,null,'topchatrbazi',this.cityHeader).subscribe((data :any) => {this.mostDiscount = data; this.addeventlister();});
    
  }
  addtocart(id){
    console.log(id)
    this.offer.addtocart(id).subscribe(
      // data => console.log(data)
    )
  }

}

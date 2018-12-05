import { Component, OnInit } from '@angular/core';
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
  constructor(private offer : PageService) { }
  ngOnInit() {

    this.offer.getMostSeenOffer().subscribe((data :any) => {this.mostseen = data.data;});
    this.offer.getnewestOffer().subscribe((data :any) => {this.newest = data.data;});
    this.offer.getmostDiscountOffer().subscribe((data :any) => {this.mostDiscount = data.data; this.addeventlister();});
    
  }

  addeventlister(){
    $(document).ready(function(){
      $(".card").click(function(){
        console.log("front")
        $(".card").removeClass("voted");
        $(this).addClass("voted");

      });

      $(".back_voted").click(function(e){
        console.log("back")
        e.stopPropagation();
        $(".card").removeClass("voted");
      });

    });
  }
}

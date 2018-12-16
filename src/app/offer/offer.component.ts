import { Component, OnInit, Input } from '@angular/core';
import { PageService } from '../page.service';
import { UsersService } from '../users.service';
//import * from 'jquery';

declare var $: any;
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {
  public mostseen;
  public newest;
  public mostDiscount;

  @Input() cityHeader :string;
  constructor(private offer : PageService ,private user: UsersService) { }
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
    this.user.addtocart(id).subscribe(
      (data : any) => {
        console.log(data)
        if(data.count && data.count >= 0){
          // #TODO Handle Alert Success Add To Cart
          console.log('ssssss')
        }else{
          // #TODO Handle Error Add To Cart
        }
      }
    )
  }

}

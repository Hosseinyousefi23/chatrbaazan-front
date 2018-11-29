import { Component, OnInit } from '@angular/core';
import * from 'jquery';

declare var $: any;
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {

  constructor() { }
  ngOnInit() {
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

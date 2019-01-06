import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { BottomSheetOverviewExampleSheet } from '../bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { PageService } from '../page.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';

declare var $: any;

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css','../sharesCss/shared_style.css']
})
export class ConventionComponent implements OnInit {

  public mostseen : any[] =[];
  public newest : any[] =[];
  public mostDiscount: any[] =[];
  @Output() showCompo =new EventEmitter<boolean>();
  @Input() cityHeader :string;
  constructor(private offer : PageService ,private user: UsersService,private toastr: ToastrService,
    private bottomSheet: MatBottomSheet) { }
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
    this.offer.search(null,null,null,'favorites',this.cityHeader,'5',null,'3').subscribe((data :any) => {this.mostseen = data['results']; if(!data['results'][0]){ this.showCompo.emit(false)} this.addeventlister();});
    this.offer.search(null,null,null,'created_at',this.cityHeader,'5',null,'3').subscribe((data :any) => { this.newest = data['results']; this.addeventlister();});
    this.offer.search(null,null,null,'topchatrbazi',this.cityHeader,'5',null,'3').subscribe((data :any) => {this.mostDiscount = data['results']; this.addeventlister();});
    this.addeventlister();
  }
  addtocart(id){
    if(localStorage.getItem("userToken")){
      this.user.addtocart(id).subscribe(
        (data : any) => {
          // console.log(data)
          if(data.count && data.count >= 0){
            this.toastr.success('به سبد خرید اضافه شد.')
          }else{
            // #TODO Handle Error Add To Cart
          }
        }
      )
      }else{
        this.toastr.info('ابتدا وارد سایت شوید !!')
      }
  }

  sendfail(slug){
    this.toastr.error('چترتون مستدام ')
    this.offer.sendfailure(slug).subscribe(
    )
  }

  sendclick(product_id){
    // this.toastr.info('آماده پرتاب')
    this.offer.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  showCopied(product_id) {
    this.offer.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
    $(".Copy_btn").text("کپی شد")
    setTimeout( function(){ 
      $(".Copy_btn").text("کپی")
    }  , 500 );
  }

  finished(a){
    // 
    $(".timer_"+a).html('<p style="color:red;">منقضی شد</p>')
  }
  
  openBottomSheet(slug): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      ,{data:{ 'slug': slug}});
  }

}

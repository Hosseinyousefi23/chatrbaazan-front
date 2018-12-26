import { Component, OnInit, Input } from '@angular/core';
import { BottomSheetOverviewExampleSheet } from '../bottom-sheet/bottom-sheet.component';
import { PageService } from '../page.service';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { MatBottomSheet } from '@angular/material';


declare var $: any;

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css','../sharesCss/shared_style.css']
})
export class ApplicationComponent implements OnInit {

  public mostseen : any[] =[];
  public newest : any[] =[];
  public mostDiscount: any[] =[];
  public config : object ={
    leftTime: 23,
    template:'$!h!ساعت$!m!دقیقه$!s!ثانیه'
  };
  t
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
    this.offer.search(null,null,null,'favorites',this.cityHeader,'5').subscribe((data :any) => {this.mostseen = data['results']; this.addeventlister();});
    this.offer.search(null,null,null,'created_at',this.cityHeader,'5').subscribe((data :any) => { this.newest = data['results']; this.addeventlister();});
    this.offer.search(null,null,null,'topchatrbazi',this.cityHeader,'5').subscribe((data :any) => {this.mostDiscount = data['results']; this.addeventlister();});
    this.addeventlister();
  }
  date_timestamp(d){
    let time = new Date(d);
    //console.log(time)
    // console.log(Date.now(),time.getTime());
    // console.log(Date.now()-time.getTime());
    return Date.now()-time.getTime();
  }
  addtocart(id){
    this.user.addtocart(id).subscribe(
      (data : any) => {
        // console.log(data)
        if(data.count && data.count >= 0){
          // #TODO Handle Alert Success Add To Cart
          // console.log('ssssss')
        }else{
          // #TODO Handle Error Add To Cart
        }
      }
    )
  }

  sendfail(slug){
    this.toastr.error('چترتون مستدام ')
    this.offer.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  sendclick(product_id){
    this.toastr.info('آماده پرتاب')
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
    }  , 3000 );
  }

  finished(a){
    $(".timer_"+a).text("منقضی شد")
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      ,{data:{ 'slug': slug}});
  }

}
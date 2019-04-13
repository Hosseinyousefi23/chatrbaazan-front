import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css','./user.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class UserprofileComponent implements OnInit {
  mode = new FormControl('over');
  panelOpenState = false;
  cart;
  userinfo;
  // userchange;
  myproduct;
  codedata;
  resend_time;
  passwords;
  mobile;
  verify_phone:boolean=false;
  verfiy_code;



  next_url = '';
  size = 4;
  page = 1;
  stop_scroll = false;

  public dateChange(event: any, dateInput: any,picker:any) {
    var faDate = dateInput.value;
    moment.locale('fa');
    var enDateMomentFormat  = moment(faDate).locale('en');
    var enDate = new Date(enDateMomentFormat.toLocaleString());
    picker._validSelected = enDate;
    picker.startAt = enDate;
}
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private user : UsersService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    // this.resend_time = new Date();
    // console.log(this.resend_time)
    // this.resend_time.setMinutes(this.resend_time.getMinutes() + 1)
    // console.log(this.resend_time)
    this.user.getDatacart().subscribe((data :any) => { this.cart = data; });
    this.codedata={
      code:'',
      explaintion:'',
      ex_date:'',
      chatr:'',
    }
    this.userinfo={
      first_name:'',
      last_name:'',
      email:'',
      mobile:'',
      address:'',
      postal_code:'',
    }
    // this.userchange={
    //   firstname:'',
    //   lastname:'',
    //   address:'',
    //   mobile:'',
    // }
    this.passwords={
      oldpass:'',
      pass1:'',
      pass2:''
    }
    this.verfiy_code='';
    this.getUserData();
    this.getUserproduct();
  }

  sendcode(){
    this.user.sendcode(this.codedata).subscribe(
      // data => console.log(data)
      );
  }

   getUserproduct(){
    this.user.getUserproduct().subscribe(
      (data :any) => {console.log(data['data'])
      this.myproduct  = data['data'].results;
      console.log(this.myproduct)
    });
  }

   getUserData(){
    this.user.getUserData().subscribe(
      data => {
        this.userinfo = data;
        console.log(data);
      }
      );
  }

  changePassword(){
    this.user.changepassword(this.passwords).subscribe(
      // data => console.log(data)
      );
  }

  UpadateProfile(){
    this.user.updateUserData(this.userinfo).subscribe(
      (data:any) => {console.log(data)
        this.toastr.success('تغییر اطلاعات موفقیت آمیز بود')
      },
      (err:HttpErrorResponse) =>{
        this.toastr.error('لطفا اطلاعات خود به طور صحیح وارد نمایید')
      }
      );
  }


  verify(){
    // console.log('hiiiiiiiiiiiiiii',this.mobile)
    this.user.verifyMobile(this.userinfo.mobile).subscribe(
      (data: any) => {
        // console.log('hiiiiiii')
        this.toastr.info('چترباز گرامی پیامی برای شما ارسال گردید')
        this.verify_phone=true;
        this.resend_time = new Date();
        this.resend_time.setMinutes(this.resend_time.getMinutes() +1);
      },
      (err:HttpErrorResponse) => {
        // this.verify_phone=true;
        // this.toastr.error('لطفا مجددا امتحان نمایید')
        // this.toastr.error('خطا در ارسال پیام')
        if(err.error['non_field_errors']){
          this.toastr.error(err.error['non_field_errors'][0])
        }
        if(err.error['phone']){
          this.toastr.error(err.error['phone'])
        }

      }
      );
  }
  resend(){
    this.user.resedsms(this.userinfo.mobile).subscribe(
      (data: any) => {
        this.toastr.info('  پیام مجددا برای شما ارسال گردید')
        this.verify_phone=true;

      },
      (err:HttpErrorResponse) => {
        if(err.error['non_field_errors']){
          this.toastr.error(err.error['non_field_errors'][0])
        }
        if(err.error['phone']){
          this.toastr.error(err.error['phone'])
        }

      }
      );
  }

  send_verifycode_user(){
    this.user.sendverifycode(this.verfiy_code,this.userinfo.mobile).subscribe(
      (data: any) => {
        // console.log('hiiiiiii')
        this.toastr.info('تایید شد')


      },
      (err : HttpErrorResponse) => {
        // this.verify_phone=true;
        // this.toastr.error('لطفا مجددا امتحان نمایید')
        // this.toastr.error('خطا در تایید')
        if(err.error['non_field_errors']){
          this.toastr.error(err.error['non_field_errors'][0])
        }
        if(err.error['phone']){
          this.toastr.error(err.error['phone'][0])
        }

      }
      );

  }

  // logout() {
  //   this.user.logout().subscribe(data => { localStorage.removeItem("userToken");})
  //   this.router.navigate(['/']);
  // }
  logout() {
    this.user.logout().subscribe(data => { this.localStorage.removeItem("userToken");
    this.router.navigate(['/']);
    })

  }

  onScroll() {
    if(!this.stop_scroll){
      this.page += 1;
      this.infinte_list();
      this.stop_scroll =true;
      }
  }

  infinte_list() {
    // this.user.getUserproduct().subscribe(
    //   (data :any) => {console.log(data['data'])
    //   this.myproduct  = data['data'].results;
    //   console.log(this.myproduct)
    // });

  //   this.data.search(null, this.Companyid, this.selectedcategory, this.selectedtab, this.cityHeader, this.size, this.page).subscribe(param => {
  //     if (param['count']) {
  //       console.log(param.results)
  //       this.pro = this.pro.concat(param['results'])
  //       this.next_url_pro = param.next
  //       for (let i of param.results) {
  //         for (let c of i.category) {
  //           if (!this.categories.some(temp => temp.name == c.name)) {
  //             this.categories.push(c);
  //           }
  //         }
  //       }
  //       if(this.next_url_pro != null){
  //         this.stop_scroll_pro = false;
  //       }else{
  //         this.stop_scroll_pro = true;
  //       }
  //     } else {
  //       this.pro = null;
  //     }
  //   });
  // }


  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
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
  codedata;
  passwords;
  mobile;
  verify_phone:boolean=false;
  verfiy_code;
  public dateChange(event: any, dateInput: any,picker:any) {
    var faDate = dateInput.value;
    moment.locale('fa');
    var enDateMomentFormat  = moment(faDate).locale('en');
    var enDate = new Date(enDateMomentFormat.toLocaleString());
    picker._validSelected = enDate;
    picker.startAt = enDate;
}
  constructor(private user : UsersService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
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
    this.user. getUserproduct().subscribe(
      data => console.log(data['data'])
      );
  }

   getUserData(){
    this.user. getUserData().subscribe(
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
      data => console.log(data)
      );
  }


  verify(){
    // console.log('hiiiiiiiiiiiiiii',this.mobile)
    this.user.verifyMobile(this.userinfo.mobile).subscribe(
      (data: any) => {
        // console.log('hiiiiiii')
        this.toastr.info('چترباز گرامی پیامی برای شما ارسال گردید')
        this.verify_phone=true;

      },
      (err) => {
        // this.verify_phone=true;
        this.toastr.error('لطفا مجددا امتحان نمایید')
        this.toastr.error('خطا در ارسال پیام')
        
      }
      );
  }

  send_verifycode_user(){
    this.user.sendverifycode(this.verfiy_code,this.userinfo.mobile).subscribe(
      (data: any) => {
        // console.log('hiiiiiii')
        this.toastr.info('تایید شد')
        

      },
      (err) => {
        // this.verify_phone=true;
        this.toastr.error('لطفا مجددا امتحان نمایید')
        this.toastr.error('خطا در تایید')
        
      }
      );

  }

  // logout() {
  //   this.user.logout().subscribe(data => { localStorage.removeItem("userToken");})
  //   this.router.navigate(['/']);
  // }
  logout() {
    this.user.logout().subscribe(data => { localStorage.removeItem("userToken");
    this.router.navigate(['/']);  
    })
  
  }
}

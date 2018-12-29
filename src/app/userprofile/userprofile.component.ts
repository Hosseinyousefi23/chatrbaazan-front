import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';

declare var $: any;
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css','./user.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class UserprofileComponent implements OnInit {
  mode = new FormControl('over');
  cart;
  userinfo;
  userchange;
  codedata;
  passwords;
  mobile;
  constructor(private user : UsersService) { }

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
    }
    this.userchange={
      firstname:'',
      lastname:'',
      address:'',
      mobile:'',
    }
    this.passwords={
      oldpass:'',
      pass1:'',
      pass2:''
    }
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
      data => console.log(data)
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
    this.user.updateUserData(this.userchange).subscribe(
      // data => console.log(data)
      );
  }


  verify(){
    this.user.verifyMobile(this.mobile).subscribe(
      // data => console.log(data)
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private user : UsersService,private toastr: ToastrService
    ,private router :Router) { }
  myuser;

  ngOnInit() {
    this.myuser = {
      email: '',
      }
  }

  forgetpassword(){
    this.user.forgotpassword(this.myuser.email).subscribe(
      data =>{ 
        // console.log(data);
        this.toastr.info('لینک تغییر رمز عبور به ایمیل شما ارسال گردید')
        this.router.navigate(['/'])
      },
      err =>{
        if(err.error['email']){
          this.toastr.error('ایمیل وارد شده موجود نمی باشد.')
        
      }
    }
    )
  }

}

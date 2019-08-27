import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersService]
})
export class SignupComponent implements OnInit {
  user;
  isSignupError :boolean = false;
  returnUrl: string;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private userservice: UsersService,private route: ActivatedRoute,private toastr: ToastrService
    ,private router :Router) { }

  ngOnInit() {
    this.user = {
    email: '',
    first_name: '',
    last_name: '',
    mobile: '',
    password1: '',
    password2: '',
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  registerUser(){
    this.userservice.register(this.user).subscribe(
      (data: any) =>{
        // localStorage.setItem('userToken',data.token)
        this.router.navigate([this.returnUrl])
        this.toastr.success('ایمیل فعال‌سازی برای شما ارسال گردید.')
      },
      (err : HttpErrorResponse) =>{
        console.log(err.error['email'])
        if(err.error['email']){
          this.toastr.error(err.error['email'][0])
          // this.toastr.error('ایمیل نامعتبر است.')
        }
        if(err.error['first_name']){
          this.toastr.error('فیلد نام خالی میباشد.')
        }
        if(err.error['last_name']){
          // this.toastr.error('lastname '+err.error['last_name'][0])
          this.toastr.error('فیلد نام خانوادگی خالی میباشد.')
        }
        if(err.error['mobile']){
          this.toastr.error(err.error['mobile'][0])
          // this.toastr.error('شماره موبایل نامعتبر است.')
        }
        if(err.error['password1']){
          // this.toastr.error('password1 '+err.error['password1'][0])
          this.toastr.error('پسورد خالی یا فاقد امنیت است')
          this.toastr.info('رمز عبور باید ترکیبی از اعداد حروف و علامت باشد(حداقل 8 کاراکتر)')
        }
        if(err.error['password2']){
          // this.toastr.error('password2 '+err.error['password2'][0])
          this.toastr.error('پسورد خالی یا فاقد امنیت است')
        }
        if(err.error['non_field_errors']){
          this.toastr.error(err.error['non_field_errors'][0])
        }
        this.isSignupError = true;

      }
    );
  }

}

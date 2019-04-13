import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  isLoginerror :boolean;
  returnUrl: string;
  user;
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private userservice: UsersService,private router :Router,
    private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    this.user = {
    email: '',
    password: '',
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  LoginUser(){
    this.userservice.login(this.user).subscribe(
      (data: any) => {
        this.localStorage.setItem('userToken',data.token)
        this.router.navigate([this.returnUrl])
      },
      (err : HttpErrorResponse) => {
        this.isLoginerror = true;
        // this.toastr.error('رمز عبور یاایمیل اشتباه است')
        if(err.error['non_field_errors']){
          this.toastr.error(err.error['non_field_errors'][0])
        }
        if(err.error['email']){
          this.toastr.error(err.error['email'][0])
        }
      }
    );
  }
}

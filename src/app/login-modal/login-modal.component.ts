import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  user;
  isLoginError :boolean = false;
  form: FormGroup;
  description:string;
  error_msg;
  // loginform: FormControl = new FormControl();
  // loginform = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, public dialogRef: MatDialogRef<LoginModalComponent>,private userservice: UsersService,private router :Router
    ,private toastr: ToastrService) {
  }

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      }
      this.error_msg='';
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  signup(){
    this.router.navigate(['/signup'])
    this.close();
  }

  forgetpassword(){
    this.router.navigate(['/forgetpassword'])
    this.close();
  }

  LoginUser(){
    // this.user.email = this.loginform.get()
    this.userservice.login(this.user).subscribe(
      (data: any) => {
        this.localStorage.setItem('userToken',data.token)
        this.dialogRef.close();
        this.router.navigate(['/'])
      },
      (err : HttpErrorResponse) => {
        this.isLoginError = true;
        if(err.error['non_field_errors']){
          // this.toastr.error(err.error['non_field_errors'][0])
          this.error_msg=err.error['non_field_errors'][0]
        }
        if(err.error['email']){
          this.error_msg=err.error['email'][0];
        }
        // this.toastr.error('رمز عبور یاایمیل اشتباه است')
      }
    );
  }

}


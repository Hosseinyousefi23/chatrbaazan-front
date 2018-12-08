import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  // loginform: FormControl = new FormControl();
  // loginform = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  constructor(public dialogRef: MatDialogRef<LoginModalComponent>,private userservice: UsersService,private router :Router) {
  }

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      }
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
        localStorage.setItem('userToken',data.token)
        this.dialogRef.close();
        this.router.navigate(['/'])
      },
      (err : HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

}


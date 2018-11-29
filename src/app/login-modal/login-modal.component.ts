import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  user;
  form: FormGroup;
  description:string;

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

  LoginUser(){
    this.userservice.login(this.user).subscribe(
      (data: any) => {
        localStorage.setItem('userToken',data.token)
        this.dialogRef.close();
        this.router.navigate(['/'])
      },
      error =>{
        console.log('error', error);
      }
    );
  }

}


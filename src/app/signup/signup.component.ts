import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersService]
})
export class SignupComponent implements OnInit {
  user
  isSignupError :boolean = false;
  returnUrl: string;
  constructor(private userservice: UsersService,private route: ActivatedRoute
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
        localStorage.setItem('userToken',data.token)
        this.router.navigate([this.returnUrl])
      },
      (err : HttpErrorResponse) =>{
        this.isSignupError = true;
      }
    );
  }

}

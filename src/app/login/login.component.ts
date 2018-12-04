import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  isLoginerror :boolean;
  user;
  constructor(private userservice: UsersService,private router :Router) { }

  ngOnInit() {
    this.user = {
    email: '',
    password: '',
    }
  }

  LoginUser(){
    this.userservice.login(this.user).subscribe(
      (data: any) => {
        localStorage.setItem('userToken',data.token)
        this.router.navigate(['/'])
      },
      error =>{
        this.isLoginerror = true;
        console.log('error', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private userservice: UsersService,private router :Router,
    private route: ActivatedRoute) { }

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
        localStorage.setItem('userToken',data.token)
        this.router.navigate([this.returnUrl])
      },
      error =>{
        this.isLoginerror = true;
        console.log('error', error);
      }
    );
  }
}

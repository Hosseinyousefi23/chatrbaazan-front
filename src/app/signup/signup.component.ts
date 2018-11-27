import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ProviderAst } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersService]
})
export class SignupComponent implements OnInit {
  user
  constructor(private userservice: UsersService) { }

  ngOnInit() {
    this.user = {
    email: '',
    first_name: '',
    last_name: '',
    mobile: '',
    password1: '',
    password2: '',
    }
  }

  registerUser(){
    this.userservice.register(this.user).subscribe(
      resposnse =>{
        alert('user added')
      },
      error =>{
        console.log('error', error);
      }
    );
  }

}

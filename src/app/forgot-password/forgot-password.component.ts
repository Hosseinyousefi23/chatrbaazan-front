import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private user : UsersService) { }

  ngOnInit() {
  }

  forgetpassword(c){
    this.user.forgotpassword(c).subscribe(
      data =>{ console.log(data);}
    )
  }

}

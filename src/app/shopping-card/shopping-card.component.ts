import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  mode = new FormControl('over');
  cart;
  number = 0;
  isLinear = false;

  constructor(private user : UsersService, private router: Router) { }

  ngOnInit() {

    this.user.getDatacart().subscribe((data :any) => { this.cart = data.result[0]; });

  }

  deletefrombasket(pid){
    this.user.deletefrombasket(pid).subscribe((data :any) => { this.cart = data.result[0]; });
  }

  completeCart(pid){
    this.user.completeCart(pid).subscribe((data :any) => { 
      // this.cart = data.result[0]; 
      if(data['success'] && data['redirect_uri']){
        this.router.navigate(['/cart/factor/' , pid]);
      }
      console.log(data)
    });
  }

  updatebasket(pid,n){
    console.log(n)
    this.user.updatecart(pid,n).subscribe((data :any) => { 
      this.cart = data.result[0];
     });
  }
}

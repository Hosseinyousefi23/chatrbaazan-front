import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { UsersService } from '../users.service';

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

  constructor(private user : UsersService) { }

  ngOnInit() {
    
    this.user.getDatacart().subscribe((data :any) => { this.cart = data.result[0]; });

  }

  deletefrombasket(pid){
    this.user.deletefrombasket(pid).subscribe((data :any) => { this.cart = data.result[0]; });
  }

  updatebasket(pid,n){
    console.log(n)
    this.user.updatecart(pid,n).subscribe((data :any) => { 
      this.cart = data.result[0];
     });
  }
}

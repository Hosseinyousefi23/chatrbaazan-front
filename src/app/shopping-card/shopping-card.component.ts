import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  mode = new FormControl('over');
  cart;
  constructor(private user : UsersService) { }

  ngOnInit() {
    this.user.getDatacart().subscribe((data :any) => {this.cart = data.data;});
  }

}

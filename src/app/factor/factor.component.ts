import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.component.html',
  styleUrls: ['./factor.component.css']
})
export class FactorComponent implements OnInit {
  mode = new FormControl('over');
  cart;
  cartId;
  constructor(private user : UsersService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.cartId = params['id'];})
    this.user.getFactor(this.cartId).subscribe((data :any) => { this.cart = data.data;
    console.log(data.data.item)
    console.log(data[0])
    });

  }

}

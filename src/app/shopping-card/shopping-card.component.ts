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
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private user : UsersService,private _formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.user.getDatacart().subscribe((data :any) => { this.cart = data.result[0]; });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  deletefrombasket(pid){
    this.user.deletefrombasket(pid).subscribe((data :any) => { this.cart = data.result[0]; });
  }
}

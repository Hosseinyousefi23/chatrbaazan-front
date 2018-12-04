import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  mode = new FormControl('over');
  constructor() { }

  ngOnInit() {
  }

}

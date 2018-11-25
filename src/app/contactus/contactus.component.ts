import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  mode = new FormControl('over');
  constructor() { }

  ngOnInit() {
  }
  
   contactus = new FormGroup({
     name : new FormControl(''),
     email : new  FormControl(''),
     text : new FormControl(''),
   })
  
   onSubmit() {
     // TODO: Use EventEmitter with form value
     console.warn(this.contactus.value);
   }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  countryForm: FormGroup;

  countries = ['USA', 'Canada', 'Uk','kashan']
constructor(private fb: FormBuilder) {}
ngOnInit() {
 this.countryForm = this.fb.group({
   countryControl: ['Canada']
 });
}
 


}

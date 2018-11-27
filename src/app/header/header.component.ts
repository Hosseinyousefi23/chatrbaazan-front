import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  countryForm: FormGroup;
  public cities = [];
  countries = ['USA', 'Canada', 'Uk', 'kashan']
  constructor(private fb: FormBuilder, private data: PageService) { }

  ngOnInit() {
    this.data.getcities().subscribe(data => this.cities = data);
    console.log(this.cities);
    console.log(this.countries);
    this.countryForm = this.fb.group({
      countryControl: ['Canada']
    });
  }


  @Output() navToggle = new EventEmitter<boolean>();
  navOpen() {
    this.navToggle.emit(true);
  }

}

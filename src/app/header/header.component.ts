import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../page.service';
import { Cities } from '../cities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PageService]
})
export class HeaderComponent implements OnInit {
  countryForm: FormGroup;
  public cities: Cities[] = [];
  countries = ['USA', 'Canada', 'Uk', 'kashan']
  constructor(private fb: FormBuilder, private data: PageService) { }

  ngOnInit() {
    this.data.getcities().subscribe((data :any) => {this.cities = data.data;
    console.log(data.data)
    console.log(this.cities)
    });
    this.countryForm = this.fb.group({
      countryControl: ['تهران']
    });
  }


  @Output() navToggle = new EventEmitter<boolean>();
  navOpen() {
    this.navToggle.emit(true);
  }

}

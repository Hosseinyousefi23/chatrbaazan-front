import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import{ PageService }  from '../page.service'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  public about:any[] =[];
  mode = new FormControl('over');
  constructor(private data :PageService) { }

  ngOnInit() {
    
    this.data.getabout().subscribe((data:any) => {this.about = data.data;}) ;
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PageService } from '../page.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[PageService]
})
export class SidenavComponent implements OnInit {

  public categories: any[] = [];

  constructor(private data: PageService, private user : UsersService) { }

  ngOnInit() {
    this.data.getCategories().subscribe((data :any) => {this.categories = data.data;});
    
  }
  

  loggedin() {
    return localStorage.getItem("userToken");
  }

}

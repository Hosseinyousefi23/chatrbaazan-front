import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, Output, EventEmitter , Inject} from '@angular/core';
import { PageService } from '../page.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[PageService]
})
export class SidenavComponent implements OnInit {

  public categories: any[] = [];

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private data: PageService, private user : UsersService,private router: Router
    ,private toastr: ToastrService) { }

  ngOnInit() {
    this.data.getCategories().subscribe((data :any) => {this.categories = data.data;});
    
  }
  

  loggedin() {
    return this.localStorage.getItem("userToken");
  }

  logout() {
    this.user.logout().subscribe(data => { this.localStorage.removeItem("userToken");
    
    })
    this.router.navigate(['/']);
  }

  plaeseLogin(){
    this.toastr.info('ابتدا وارد سایت شوید !!')
  }

}

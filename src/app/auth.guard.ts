import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import {  CanActivate,Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice : UsersService ,private router :Router){}
  logged : boolean;
  canActivate() :boolean{
    this.userservice.logged().subscribe(data => { console.log(data['token']); if(data['token']){this.logged = true}else{this.logged = false}} );
    if(this.logged){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }

}

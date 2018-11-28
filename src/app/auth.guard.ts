import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import {  CanActivate,Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice : UsersService ,private router :Router){}

  canActivate() :boolean{
    if(this.userservice.logged()){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }

}

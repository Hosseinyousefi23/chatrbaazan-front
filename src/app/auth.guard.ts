import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import {  CanActivate,Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice : UsersService ,private router :Router){}
  logged : boolean;

  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot) :boolean{
    // this.userservice.logged().subscribe(data => {console.log("onComplete"); if(data['token']){this.logged = true}else{this.logged = false}} );
    // console.log(this.logged)
    if(localStorage.getItem('userToken')){
      return true
    }else{
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }})
      return false
    }
  }

}

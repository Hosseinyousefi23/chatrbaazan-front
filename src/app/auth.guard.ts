import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {UsersService} from './users.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private userservice: UsersService, private router: Router) {
  }

  logged: boolean;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this.userservice.logged().subscribe(data => {console.log("onComplete"); if(data['token']){this.logged = true}else{this.logged = false}} );
    // console.log(this.logged)
    if (this.localStorage.getItem('userToken')) {
      return true
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      return false
    }
  }

}

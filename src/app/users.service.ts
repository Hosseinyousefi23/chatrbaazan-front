import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public headers: Headers = new Headers({
    'content-type': 'application/json',
    'Token': localStorage.getItem("userToken")
  })  	

  baseUrl = environment.baseUrl;
  private token = localStorage.getItem("userToken");
  constructor(private http: HttpClient) { }

  register(userdata): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/registration/', userdata)
  }

  login(userdata): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login/', userdata)
  }
  //TODO: check token by sending to server
  // getstatus(){
  //   return this.http.post(this.baseUrl + '/auth/verify/', {headers : new HttpHeaders({'Token': this.token})}).subscribe(
  //     res => console.log(res)
  //   );
  // }
  logged() {
    if (!this.token) { return false; }
    return true;
  }

  logout() {
    localStorage.removeItem("userToken");
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: object ={
    token: localStorage.getItem("userToken") 
  }
  baseUrl = environment.baseUrl;
  // private token = localStorage.getItem("userToken");
  constructor(private http: HttpClient) { }

  register(userdata): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/registration/', userdata)
  }

  login(userdata): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login/', userdata)
  }
  public setRequestOptions(): any {
    let token = this.token;
    let headerOptions: any = {'Content-Type': 'application/json'};
    headerOptions['Authorization'] = 'Bearer '+token;
    let headers = new Headers(headerOptions);
    return new RequestOptions({headers: headers});
}

  logged() {
    return this.http.post(this.baseUrl + 'auth/verify/' , this.token)
  }


  logout() {
    localStorage.removeItem("userToken");
  }

}

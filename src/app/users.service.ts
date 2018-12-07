import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token_string = localStorage.getItem("userToken") 
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
    let token = this.token_string;
    let headerOptions: any = {'Content-Type': 'application/json'};
    headerOptions['Authorization'] = 'Bearer '+token;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+token)
    return headers
    // return new RequestOptions({headers: headers});
}


  logged() {
    return this.http.post(this.baseUrl + 'auth/verify/' , this.token)
  }


  logout() {
    localStorage.removeItem("userToken");
  }

  getDatacart(){
    return this.http.get(this.baseUrl + 'api/v1/cart/' , {
      headers: { 'Content-Type':  'application/json','Authorization': 'Bearer '+this.token_string}
   });
  }

  

}

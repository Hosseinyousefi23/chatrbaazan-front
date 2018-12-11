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
    let headerOptions: any = {'Content-Type': 'application/json'};
    headerOptions['Authorization'] = 'Bearer '+this.token_string;
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer '+token)
    // return headers
    return new RequestOptions({headers: headerOptions});
}


  logged() {
    return this.http.post(this.baseUrl + 'auth/verify/' , this.token)
  }


  logout() {
    localStorage.removeItem("userToken");
  }

  getDatacart(){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': 'Bearer '+this.token_string
         });    
         let options = {
      headers: httpHeaders
         };  
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+this.token_string)
    .append('Content-Type', 'application/json');
    console.log(new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+this.token_string}
    ))
    return this.http.get(this.baseUrl + 'api/v1/cart/' ,{
      headers: headers});
  }

  

}

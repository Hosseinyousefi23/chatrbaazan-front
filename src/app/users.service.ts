import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {  Headers, RequestOptions} from '@angular/http';
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
    if(!this.token_string){
      this.token['token'] = "a"
    }
    return this.http.post(this.baseUrl + 'auth/verify/' , this.token)
  }


  // logout(): Observable<any> {
  //   // localStorage.removeItem("userToken");
  //   return this.http.post(this.baseUrl + 'auth/logout/') 
  // }

  logout(): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/logout/',this.token)
  }

  getDatacart(){
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+this.token_string)
    .append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'api/v1/cart/' ,{
      headers: headers});
  }

  
  sendcode(code) {
    console.log(code)
    let pid: object = {
      code:'12' 
    }
    return this.http.post(this.baseUrl + 'api/v1/user/code/' ,pid, {
      headers: new HttpHeaders( { 'Content-Type':  'application/json','Authorization': 'Bearer '+this.token_string})
   });
  }

  deletefrombasket(productId) {
    const body = new HttpParams().set('cart', productId)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+this.token_string
      })
      ,body : body
    };
    return this.http.delete(this.baseUrl + 'api/v1/cart/' ,httpOptions);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {  Headers, RequestOptions} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: object ={
    token: localStorage.getItem("userToken") 
  }
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  register(userdata): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/registration/', userdata)
  }

  login(userdata): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login/', userdata)
  }
//   public setRequestOptions(): any {
//     let headerOptions: any = {'Content-Type': 'application/json'};
//     headerOptions['Authorization'] = 'Bearer '+this.token_string;
//     // let headers = new HttpHeaders();
//     // headers.append('Content-Type', 'application/json');
//     // headers.append('Authorization', 'Bearer '+token)
//     // return headers
//     return new RequestOptions({headers: headerOptions});
// }


  logged() {
      this.token['token'] = localStorage.getItem("userToken")
      return this.http.post(this.baseUrl + 'auth/verify/' , this.token)
  }

  logout(): Observable<any> {
    this.token['token'] = localStorage.getItem("userToken")
    return this.http.post(this.baseUrl + 'auth/logout/',this.token)
  }

  getUserData(){
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+ localStorage.getItem("userToken") )
    .append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'auth/user/' ,{
      headers: headers});
  }

  getUserproduct(){
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+ localStorage.getItem("userToken") )
    .append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'api/v1/user/product/' ,{
      headers: headers});
  }

  getDatacart(){
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+ localStorage.getItem("userToken") )
    .append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'api/v1/cart/' ,{
      headers: headers});
  }

  addtocart(productId) {
    let pid: object = {
      product: productId
    }
    const body = new HttpParams()
      .set('product', productId)
    return this.http.post(this.baseUrl + 'api/v1/cart/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
    });
  }

  forgotpassword(email) {
    const body = new HttpParams()
      .set('email', email)
    return this.http.post(this.baseUrl + 'auth/password/reset/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
    });
  }

  updatecart(productId,n) {
    const body = new HttpParams()
      .set('itemId', productId)
      .set('itemCount', n)
    return this.http.put(this.baseUrl + 'api/v1/cart/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
    });
  }

  deletefrombasket(productId) {
    const body = new HttpParams().set('cart', productId)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ localStorage.getItem("userToken") 
      })
      ,body : body
    };
    return this.http.delete(this.baseUrl + 'api/v1/cart/' ,httpOptions);
  }

  sendcode(code) {
    let pid: object = {
      code: code 
    }
    return this.http.post(this.baseUrl + 'api/v1/user/code/' ,pid, {
      headers: new HttpHeaders( { 'Content-Type':  'application/json','Authorization': 'Bearer '+ localStorage.getItem("userToken") })
   });
  }
}

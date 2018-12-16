import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {  Headers, RequestOptions} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: object ={
    token: localStorage.getItem("userToken") 
  }
  // token_string = localStorage.getItem("userToken") 
  baseUrl = environment.baseUrl;
  // private token = localStorage.getItem("userToken");
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


  // logout(): Observable<any> {
  //   // localStorage.removeItem("userToken");
  //   return this.http.post(this.baseUrl + 'auth/logout/') 
  // }

  logout(): Observable<any> {
    this.token['token'] = localStorage.getItem("userToken")
    return this.http.post(this.baseUrl + 'auth/logout/',this.token)
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

  sendcode(code) {
    console.log(code)
    let pid: object = {
      code:'12' 
    }
    return this.http.post(this.baseUrl + 'api/v1/user/code/' ,pid, {
      headers: new HttpHeaders( { 'Content-Type':  'application/json','Authorization': 'Bearer '+ localStorage.getItem("userToken") })
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

}

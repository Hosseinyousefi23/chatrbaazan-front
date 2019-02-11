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

  getFactor(cartId){
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+ localStorage.getItem("userToken") )
    .append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'api/v1/cart/factor/'+cartId ,{
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
    const body = new HttpParams()
      .set('product', productId)
    return this.http.post(this.baseUrl + 'api/v1/cart/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
    });
  }
  completeCart(productId) {
    return this.http.get(this.baseUrl + 'api/v1/cart/complete/'+productId,  {
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

  resetpassConfrim(user,uid,token) {
    const body = new HttpParams()
      .set('new_password1', user.pass1)
      .set('new_password2', user.pass2)
      .set('uid', uid)
      .set('token', token)
    return this.http.post(this.baseUrl + 'auth/password/reset/confirm/'+uid+"-"+token+"/", body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
    });
  }

  updateUserData(user) {
    const body = new HttpParams()
      .set('first_name', user.first_name)
      .set('last_name', user.last_name)
      .set('mobile', user.mobile)
      .set('address', user.address)
      .set('postal_code', user.postal_code)

    return this.http.put(this.baseUrl + 'api/v1/user/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
    });
  }

  changepassword(password) {
    const body = new HttpParams()
      .set('password_old', password.oldpass)
      .set('password_1', password.pass1)
      .set('password_2', password.pass2)
    return this.http.put(this.baseUrl + 'api/v1/user/password/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
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
    const body = new HttpParams()
      .set('code', code.code)
      .set('chatrbazi', code.chatr)
      .set('expiration_date', code.ex_date)
      .set('explanation', code.explaintion)
    return this.http.post(this.baseUrl + 'api/v1/user/code/' ,body, {
      headers: new HttpHeaders( { 'Content-Type':  'application/x-www-form-urlencoded'})
   });
  }

  verifyMobile(mobile) {
    const body = new HttpParams()
      .set('phone', mobile)
    return this.http.post(this.baseUrl + 'api/v1/sms/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
    });
  }

  sendverifycode(code,mobile) {
    const body = new HttpParams()
      .set('code_verify', code)
    return this.http.put(this.baseUrl + 'api/v1/sms/'+mobile, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem("userToken") })
    });
  }

  resedsms(mobile) {
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer '+ localStorage.getItem("userToken") )
    .append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/api/v1/sms/resend/'+mobile , {
      headers: headers});
  }
  
}

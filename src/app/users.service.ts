import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(userdata): Observable<any>{
    return this.http.post(this.baseUrl+'auth/registration/',userdata)
  }

  login(userdata): Observable<any>{
    return this.http.post(this.baseUrl+'auth/login/',userdata)
  }
//TODO: check token by sending to server
  logged(){
    return localStorage.getItem("userToken");
  }

  logout() {
    localStorage.removeItem("userToken");
  }

}

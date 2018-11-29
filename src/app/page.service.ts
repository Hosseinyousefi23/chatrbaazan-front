import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cities } from './cities';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getcities(): Observable<Cities[]>{
    // console.log(this.http.get<Cities[]>(this.baseUrl+'api/v1/city/'))
    return this.http.get<Cities[]>(this.baseUrl+'api/v1/city/')
  }

  getbanner(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/banner/')
  }
}

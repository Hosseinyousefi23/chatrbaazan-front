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
    return this.http.get<Cities[]>(this.baseUrl+'api/v1/city/')
  }

  getbanner(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/banner/')
  }

  getCategories(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/category')
  }


  getMostSeenOffer(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/offer?limits=10&ordering=created_at')
  }

  getnewestOffer(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/offer?limits=10&ordering=created_at')
  }

  getmostDiscountOffer(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/offer?limits=10&ordering=created_at')
  }


  getproductByslug(slug): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/offer/'+slug);
  }

  getabout(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'api/v1/about/')
  }




}

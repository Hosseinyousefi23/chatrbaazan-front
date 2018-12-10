import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cities } from './cities';
import { pipeDef } from '@angular/core/src/view';
import {  debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  token_string = localStorage.getItem("userToken");
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getcities(): Observable<Cities[]> {
    return this.http.get<Cities[]>(this.baseUrl + 'api/v1/city/')
  }

  getbanner(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/banner/')
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/category')
  }


  getMostSeenOffer(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/offer?limits=10&ordering=created_at')
  }

  getnewestOffer(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/offer?limits=10&ordering=created_at')
  }

  getmostDiscountOffer(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/offer?limits=10&ordering=created_at')
  }


  getproductByslug(slug): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/offer/' + slug);
  }

  getabout(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/about/')
  }

  addtocart(productId) {
    // console.log(productId)
    // let pid: object = {
    //   product: productId
    // }
    return this.http.get(this.baseUrl + 'api/v1/cart/' , {
      headers: new HttpHeaders( { 'Content-Type':  'application/json','Authorization': 'Bearer '+this.token_string})
   });
  }


  search(term,company=null,category=null) {
    let  search_url = 'api/v1/offer/?search='+term
    if(company){search_url = search_url+'&company_slug='+company}
    if(category){search_url = search_url+'&category_slug='+category}
    var listOfBooks = this.http.get(this.baseUrl+search_url)
    .pipe(
        debounceTime(500),  
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data.data : [{"BookName": "No Record Found"} as any]
                );
            }
    ));

    return listOfBooks;  
} 



searchbyCategory(term) {
  return this.http.get(this.baseUrl+'api/v1/offer/?category_slug='+term)
}

searchbyCompany(term) {
  return this.http.get(this.baseUrl+'api/v1/offer/?company_slug='+term)
}

}

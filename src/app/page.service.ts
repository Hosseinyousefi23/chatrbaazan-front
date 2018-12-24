import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cities } from './cities';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getcities(): Observable<Cities[]> {
    return this.http.get<Cities[]>(this.baseUrl + 'api/v1/city/')
  }

  getbanner(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/banner/')
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/category/')
  }


  getproductByslug(slug): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/offer/' + slug);
  }

  getabout(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/about/')
  }

  getContactInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/v1/setting/')
  }

  sendfailure(slug){
    return this.http.get<any[]>(this.baseUrl + 'api/v1/failure/'+slug)
  }

  sendclick_like(productId) {
    
    const body = new HttpParams()
      .set('product', productId)

    return this.http.post(this.baseUrl + 'api/v1/like/', body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
    
  }




  search(term = null, company = null, category = null, ordering = null, city = null,limit =null,page=null) {
    let search_url = 'api/v1/offer/?'
    if (term) { search_url = search_url + 'search=' + term }
    if (company) { search_url = search_url + '&company_slug=' + company }
    if (category) { search_url = search_url + '&category_slug=' + category }
    if (ordering) { search_url = search_url + '&ordering=' + ordering }
    if (city) { search_url = search_url + '&city=' + city }
    if (limit) { search_url = search_url + '&limits=' + limit }
    if (page) { search_url = search_url + '&page=' + page }
    var result = this.http.get(this.baseUrl + search_url)
      .pipe(
        debounceTime(500),
        map(
          (data: any) => {
            return (
              data.length != 0 ? data.data : [{ "BookName": "No Record Found" } as any]
            );
          }
        ));
    return result;
  }

}

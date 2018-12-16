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



  search(term = null, company = null, category = null, ordering = null, city = null) {
    let search_url = 'api/v1/offer/?'
    if (term) { search_url = search_url + 'search=' + term }
    if (company) { search_url = search_url + '&company_slug=' + company }
    if (category) { search_url = search_url + '&category_slug=' + category }
    if (ordering) { search_url = search_url + '&ordering=' + ordering }
    if (city) { search_url = search_url + '&city=' + city }
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  contactus(data): Observable<any> {
    return this.http.post(this.baseUrl + 'api/v1/contact/', data);
  }
}

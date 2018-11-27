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
}

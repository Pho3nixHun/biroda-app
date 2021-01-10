import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly URL = '';

  constructor(private http: HttpClient) { }

  resolveItems(): Observable<any> {
    return this.http.get(this.URL);
  }
}

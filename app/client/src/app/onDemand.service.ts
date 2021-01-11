import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnDemandService {
  // TODO: Move this to app.config
  private readonly URL = 'http://localhost:3000/api/ondemand';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  layout(region?: string): Observable<any> {
    return this.http
      .get(`${this.URL}/layout${region ? `/${region}` : ''}`)
      .pipe(catchError(this.handleError));
  }
  section(id: string): Observable<any> {
    return this.http
      .get(`${this.URL}/section/${id}`)
      .pipe(catchError(this.handleError));
  }
  carousel(id: string): Observable<any> {
    return this.http
      .get(`${this.URL}/carousel/${id}`)
      .pipe(catchError(this.handleError));
  }
  details(id: string): Observable<any> {
    return this.http
      .get(`${this.URL}/details/${id}`)
      .pipe(catchError(this.handleError));
  }
  search(query: string): Observable<any> {
    return this.http
      .get(`${this.URL}/search/${query}`)
      .pipe(catchError(this.handleError));
  }
}

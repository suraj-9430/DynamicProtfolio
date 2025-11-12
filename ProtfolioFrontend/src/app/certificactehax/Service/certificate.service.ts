import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertiService {

  private baseUrl = 'http://localhost:8080/api/certificates';
  constructor(private http: HttpClient) { }


  getByUser(email: any): Observable<any> {
    //  return this.http.get<any>(`${this.baseUrl}/email/${email}`);
    return this.http.get<any>(`${this.baseUrl}/email/${email}`, {
      withCredentials: true // 👈 send the cookie with request
    });

  }
}

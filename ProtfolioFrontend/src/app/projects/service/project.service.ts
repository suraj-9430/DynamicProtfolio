import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Projectservice {

  private baseUrl = 'http://localhost:8080/api/project';
  constructor(private http: HttpClient) { }


  getByEmail(email: any): Observable<any> {
    //  return this.http.get<any>(`${this.baseUrl}/email/${email}`);
    return this.http.get<any>(`${this.baseUrl}/email/${email}`, {
      withCredentials: true
    });

  }
}

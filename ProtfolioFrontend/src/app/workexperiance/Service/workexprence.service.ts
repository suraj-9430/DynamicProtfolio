import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkexprenceService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/api/workexp';


  getByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/me`, {
      withCredentials: true 
    });

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  // ✅ make sure this is imported

@Injectable({
  providedIn: 'root'
})
export class Loginservice {
  private baseUrl = 'http://localhost:8080/api';
  private loginURL = `${this.baseUrl}/login`;
  private OtpURL = `${this.baseUrl}/otp`; // cleaner way

  constructor(private http: HttpClient) { }

  Login(data: any): Observable<any> {
    return this.http.post<any>(this.loginURL, data, {
      withCredentials: true
    });
  }
  OtpReq(data: any): Observable<any> {
    return this.http.post<any>(this.OtpURL, data);
  }
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/userinfo/createrec`, data);
  }
  createworkExp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/workexp/workrec`, data);
  }
  createProject(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/project/pcreate`, data);
  }

  createCertificate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/certificates/upload`, data);
  }
  createsocial(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/socialmedia/save`, data)
  }
}

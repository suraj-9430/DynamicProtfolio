import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Homeservice {
  private contactNum = new BehaviorSubject<any>(null);
  private role = new BehaviorSubject<any>(null);

  private baseUrl = 'http://localhost:8080/api/userinfo';
  private profileURL = 'http://localhost:8080/api/socialmedia';
 private logOut = 'http://localhost:8080/api/logout';
  constructor(private http: HttpClient) { }


  getByUser(email: any): Observable<any> {
    //  return this.http.get<any>(`${this.baseUrl}/email/${email}`);
    return this.http.get<any>(`${this.baseUrl}/email/me`, {
      withCredentials: true // 👈 send the cookie with request
    });

  }
  getProfilePic(email: string): Observable<Blob> {
    const encoded = encodeURIComponent(email);
    const url = `${this.profileURL}/email/me/profile-pic`;
    return this.http.get(url, { responseType: 'blob', withCredentials: true });
  }

  SetData(data: any) {
    this.contactNum.next(data);
  }
  SetRole(role: any) {
    this.role.next(role);
  }



  getData() {
    return this.contactNum.asObservable();
  }
  getRole() {
    return this.role.asObservable();
  }
  logout(): Observable<any>{
    return this .http.get(this.logOut, {
      withCredentials: true // 👈 send the cookie with request
    });
  }
}

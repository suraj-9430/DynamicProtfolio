import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Footerservice {

  private baseUrl = 'http://localhost:8080/api/socialmedia';
  constructor(private http: HttpClient) { }


  getByUser(email: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/email/${email}`, {
      withCredentials: true // 👈 send the cookie with request
    });

  }



  // Build resume URL (server route)
  resumeUrl(email: string, download = false): string {
    const encoded = encodeURIComponent(email);
    return `${this.baseUrl}/email/${encoded}/resume${download ? '?download=true' : ''}`;
  }

  // Fetch resume as blob (no headers)
  // downloadResumeBlob(email: string): Observable<Blob> {
  //   const url = this.resumeUrl(email, false);
  //   return this.http.get(url, { responseType: 'blob',withCredentials: true });
  // }

  // Fetch resume and return full HttpResponse so we can read headers (filename)
  downloadResumeWithHeaders(email: string): Observable<HttpResponse<Blob>> {
    const url = this.resumeUrl(email, false);
    return this.http.get(url, { responseType: 'blob', observe: 'response',withCredentials: true });
  }


}

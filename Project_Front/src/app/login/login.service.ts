import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl1 = "http://localhost:8080/api/auth/authenticate";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {    //Class that can be use to get stored JWT from browswer's local Storage for any Authorization purpose 
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<{ token: string }>(`${this.apiUrl1}`, body);
  }
}

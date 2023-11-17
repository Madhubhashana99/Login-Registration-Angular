import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl1 = "http://localhost:8080/api/auth/authenticate";
  private apiUrl2 = "";
  private apiUrl3 = "";

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

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  getUsername():Observable<string>{//getting the current logged user
    const headers = this.getHeaders();
    return this.http.get<string>('${this.apiUrl2}',{headers}); // using stored token
  }

  getUserProfile(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get<any>('${this.apiUrl3}',{headers});
  }

  getUserRole():Observable<String>{
    const token = localStorage.getItem('token') || '';
    const decodedToken: any = jwt_decode(token);
    const role = decodedToken.role[0];
    return of(role);
  }

 

}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}


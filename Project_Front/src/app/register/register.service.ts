import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 private apiUrl = 'http://localhost:8080/api/auth/register';

  constructor(private http:HttpClient) { }

  register(userDetails: any):Observable<any>{
    const url = `${this.apiUrl}`
    return this.http.post(url , userDetails);
  }
}

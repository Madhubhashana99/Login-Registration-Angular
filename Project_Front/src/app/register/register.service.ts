import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http:HttpClient) { }

  register(userDetails: any):Observable<any>{
    return this.http.post('${this.baseUrl}/register',userDetails);
  }
}

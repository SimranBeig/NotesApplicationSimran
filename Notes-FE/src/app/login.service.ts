import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5362/api/user';

  constructor(private http: HttpClient) { }

  userLogin(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}

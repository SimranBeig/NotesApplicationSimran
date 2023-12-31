import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:5362/api/user';

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}

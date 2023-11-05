import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  constructor(private router: Router) { }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

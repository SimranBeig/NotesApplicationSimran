// navbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string = '';
  display: boolean = true;
  userData = { username: '', password: '' };



  constructor(private loginService: LoginService, private router: Router) { }



  onSubmit(formData: any) {
    this.loginService.userLogin(formData).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token', response.token)
      // this.successMessage = 'Login Successful'
      this.display = false
      this.router.navigate(['/notes']);
    }, (error) => {
      console.log('error', error);
      this.error = 'Login Failed. Please Try Again'
      setTimeout(() => {
        this.error = '';
      }, 3000);
    })
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }
}

import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {

  userData = { username: '', first_name: '', last_name: '', email: '', password: '' };
  showRegistration: boolean = true;

  constructor(private registrationService: RegistrationService, private router: Router) { }


  onSubmit(formData: any) {
    this.registrationService.registerUser(formData).subscribe(response => {
      console.log(response);
      this.router.navigate(['login']);
      // this.showRegistration = false;
    })
    // console.log(formData);

  }

  navigateToLogin() {
    this.router.navigate(['/login'])
  }
}

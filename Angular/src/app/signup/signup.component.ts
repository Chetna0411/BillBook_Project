import { Component,OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { LoginuserService } from '../loginuser.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {};
  errorMessage: string = '';
  userService: any;

//constructor(){ }

ngOnInit(): void {

}

constructor(private loginuserService: LoginuserService, private router: Router) { }

  userSignUp() {
    this.loginuserService.signUpUser(this.user).subscribe(
      (response: any) => {
        // Assuming backend returns success status
        console.log(response);
        if (response.useremail!=null) {
          // Redirect to login page after successful registration
          console.log(this.user)
          alert('Registration Successful! Please Log In');
          this.router.navigate(['/login']);
        } else {
          // Handle registration failure, show error message or toast
          console.log('Registration failed:', response.message);
        }
      },
      (error: any) => {
        // Handle error, show error message or toast
        console.error('An error occurred:', error);
      }
    );
  }

}
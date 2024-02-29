import { Component, OnInit } from '@angular/core';
import { Userlogin } from '../userlogin';
import { LoginuserService } from '../loginuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})





export class LoginComponent implements OnInit {
  user: any = {};
  errorMessage: string = '';
  userService: any;

  constructor(private loginuserService:LoginuserService, private router: Router) { }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  userLogin() {
   
    this.loginuserService.loginUser(this.user)
      .subscribe((response: any) => {
        // Check if login is successful
        if (response.useremail!=null && response.password!=null) {
          // Navigate to homepage on successful login
          console.log(this.user)
          alert("Login Successfully");
          this.router.navigate(['/homepage']);
        } else {
          // Display error message for invalid email/password
          this.errorMessage = 'Invalid email or password.';
        }
      }, (error: any) => {
        // Handle error, e.g., display generic error message
        this.errorMessage = 'An error occurred. Please try again later.';
      });
  }
}

import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  invalidSignup: boolean;
  errorDetails: string
  constructor(private authService: AuthService, private router: Router) { }

  signup(signupDetails) {
    //resets error notifier
    this.errorDetails = null;

    //makes sure isAdmin a boolean property
    if (!signupDetails.isAdmin) signupDetails.isAdmin = false;

    this.authService.signup(signupDetails)
      .subscribe(result => { if (result) this.router.navigate(['/movies']) },
        error => {
          //if signup is denied by server, get server's error message -- could be better implemented by a more indepth signup validation
          if (error.status == 400) this.errorDetails = error.error;
        });
  }

  ngOnInit() {
  }

}

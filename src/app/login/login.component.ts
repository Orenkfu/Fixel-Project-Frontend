import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onFormTouch() {
    this.invalidLogin = false;
  }

  login(credentials) {
    this.authService.login(credentials).subscribe(result => {
      this.router.navigate(['/movies']);
    }, error => {
      if (error.status == 400) this.invalidLogin = true
    });
  }
}

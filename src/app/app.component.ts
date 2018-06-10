import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) { }


  isAdmin() {
    return this.authService.isUserAdmin();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);

  }
}

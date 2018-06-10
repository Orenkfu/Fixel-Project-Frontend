import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  click: EventEmitter<null>;
  constructor(private authService: AuthService) {
    this.click = new EventEmitter();
  }
  logout() {
    this.click.emit();
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  ngOnInit() {
  }

}

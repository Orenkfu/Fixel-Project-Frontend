import { map, catchError } from 'rxjs/operators';
import { LoginDetails } from './../models/login-details';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
//import { errorHandler } from '@angular/platform-browser';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "/api/auth";
  jwtHelper: JwtHelperService;
  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }
  //shorthand for appending auth header
  appendAuthHeader() {
    const token = this.getToken();
    if (token)
      return new HttpHeaders().append('X-Auth-JWT', token);
    else return null;
  }

  login(loginDetails: LoginDetails) {
    return this.http.post(this.url, loginDetails).pipe(

      map(response => {
        if (response['token']) {
          this.storeToken(response['token']);
          return true;
        }
        return false;
      })
    );
  }
  /*
  there's a bug with retrieving headers in new angular httpclient - stackoverflow seems to be as baffled about it as I am
  hence, as a temporary solution, JWT will be delievered in the response body.
  */
  signup(signupDetails) {
    return this.http.post(`${this.url}/new`, signupDetails).pipe(
      map(response => {
        if (response['token']) {
          this.storeToken(response['token']);
          return true;
        }
        return false;
      })
    )
  };

  isLoggedIn() {
    const token = this.getToken();
    const decoded = this.jwtHelper.decodeToken(token);
    // console.log(this.isTokenExpired(decoded.exp));
    return decoded ? true : false;
  }
  //bugged expiry dates..
  //TODO: either find a package that can properly decode and report token expiry date, or do it by hand.
  private isTokenExpired(millisecondsDate) {
    const date = moment(millisecondsDate * 1000);
    return date.isSameOrAfter(moment());
  }
  isUserAdmin() {
    const decoded = this.jwtHelper.decodeToken(this.getToken());
    if (!decoded) return false;
    return decoded.isAdmin;
  }
  currentUserId() {
    const decoded = this.jwtHelper.decodeToken(this.getToken());
    if (!decoded) return null;
    return decoded._id;
  }

  logout() {
    this.removeToken();
  }

  //helper methods to guarantee session storage consistency
  storeToken(token) {
    sessionStorage.setItem('token', token);
  }
  getToken() {
    return sessionStorage.getItem('token');
  }
  removeToken() {
    sessionStorage.removeItem('token');
  }
}

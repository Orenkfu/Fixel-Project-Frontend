import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url: string = '/api/orders'
  constructor(private authService: AuthService, private http: HttpClient) { }

  purchaseTicket(order) {
    return this.http.post(this.url, order, { headers: this.authService.appendAuthHeader() })
  }
}

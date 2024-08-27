import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Base/Environment';
import { Payment } from '../interface/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  header: any = {
    token: localStorage.getItem('userToken')
  }

  constructor(private _http:HttpClient) { }

  checkoutVisa(id:string, formData:Payment):Observable<any>{
    return this._http.post(`${Environment.baseUrl}/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: formData
      },
       { headers: this.header })
  }
  checkoutCash(id:string, formData:Payment):Observable<any>{
    return this._http.post(`${Environment.baseUrl}/orders/${id}`,
      {
        shippingAddress: formData
      },
       { headers: this.header })
  }
}

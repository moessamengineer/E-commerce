import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header: any = {
    token: localStorage.getItem('userToken')
  }
  constructor(private _http: HttpClient) {

  }
  AddProductToCart(id: string): Observable<any> {
    return this._http.post(`${Environment.baseUrl}/cart`, {
      productId: id
    }, {
      headers: this.header
    }
    )
  }
  GetProducts(): Observable<any> {
    return this._http.get(`${Environment.baseUrl}/cart`, { headers: this.header })
  }
  getCartItemCount(): Observable<any> {
    return this._http.get(`${Environment.baseUrl}/cart`, { headers: this.header })
  }
  UpdateProductInCart(id: string, count: number): Observable<any> {
    return this._http.put(`${Environment.baseUrl}/cart/${id}`, {
      count: count
    }, {
      headers: this.header
    }
    )
  }
  DeleteProductINCart(id: string): Observable<any> {
    return this._http.delete(`${Environment.baseUrl}/cart/${id}`, {
      headers: this.header
    }
    )
  }
  ClearUserCart(): Observable<any> {
    return this._http.delete(`${Environment.baseUrl}/cart`, {
      headers: this.header
    }
    )
  }
}

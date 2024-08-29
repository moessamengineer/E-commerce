import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(private _http: HttpClient) {

  }
  AddProductToCart(id: string): Observable<any> {
    return this._http.post(`${Environment.baseUrl}/cart`, {
      productId: id
    }, 
    )
  }
  GetProducts(): Observable<any> {
    return this._http.get(`${Environment.baseUrl}/cart`)
  }
  getCartItemCount(): Observable<any> {
    return this._http.get(`${Environment.baseUrl}/cart`)
  }
  UpdateProductInCart(id: string, count: number): Observable<any> {
    return this._http.put(`${Environment.baseUrl}/cart/${id}`, {
      count: count
    }
    )
  }
  DeleteProductINCart(id: string): Observable<any> {
    return this._http.delete(`${Environment.baseUrl}/cart/${id}`, 
    )
  }
  ClearUserCart(): Observable<any> {
    return this._http.delete(`${Environment.baseUrl}/cart`, 
    )
  }
}

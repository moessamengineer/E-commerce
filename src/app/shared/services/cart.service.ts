import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Base/Environment';
import { Subject, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemCountChanged = new Subject<number>();

  constructor(private _http: HttpClient) { }

  AddProductToCart(id: string): Observable<any> {
    return this._http.post(`${Environment.baseUrl}/cart`, {
      productId: id
    }).pipe(
      tap(() => {
        this.getCartItemCount().subscribe((res: any) => {
          this.cartItemCountChanged.next(res.numOfCartItems);
        });
      })
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
    }).pipe(
      tap(() => {
        this.getCartItemCount().subscribe((res: any) => {
          this.cartItemCountChanged.next(res.numOfCartItems);
        });
      })
    )
  }

  DeleteProductINCart(id: string): Observable<any> {
    return this._http.delete(`${Environment.baseUrl}/cart/${id}`).pipe(
      tap(() => {
        this.getCartItemCount().subscribe((res: any) => {
          this.cartItemCountChanged.next(res.numOfCartItems);
        });
      })
    )
  }

  ClearUserCart(): Observable<any> {
    return this._http.delete(`${Environment.baseUrl}/cart`).pipe(
      tap(() => {
        this.cartItemCountChanged.next(0);
      })
    )
  }
}
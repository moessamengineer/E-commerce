import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {


constructor(private _http:HttpClient) { 
  
}

AddProductToWishList(id: string): Observable<any> {
  return this._http.post(`${Environment.baseUrl}/wishlist`, {
    productId: id
  }, 
  )
}
DeleteProductformWishList(id: string): Observable<any> {
  return this._http.delete(`${Environment.baseUrl}/wishlist/${id}`, 
  )
}
GetWishList(): Observable<any> {
  return this._http.get(`${Environment.baseUrl}/wishlist`)
}
}


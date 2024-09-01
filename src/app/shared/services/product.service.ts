import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


constructor(private _http:HttpClient) { 
  
}

GetProducts():Observable<any>{
return this._http.get(`${Environment.baseUrl}/products`)
}
 
GetCategories():Observable<any>{
return this._http.get(`${Environment.baseUrl}/categories`)
}
GetBrands():Observable<any>{
return this._http.get(`${Environment.baseUrl}/brands`)
}
 
GetSpecificProduct(id:string):Observable<any>{
return this._http.get(`${Environment.baseUrl}/products/`+id)
}
 
}


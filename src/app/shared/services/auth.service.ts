import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../Base/Environment';
import { Login, Register } from '../interface/register';
import { jwtDecode } from "jwt-decode";
import { ForgotPassword } from '../interface/forgot-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


constructor(private _http:HttpClient) { 
  afterNextRender(()=>{
    if(localStorage.getItem('userToken')!=null){
      this.userInformation();
    }
  })
}

register(formData:Register):Observable<any>{
return this._http.post(`${Environment.baseUrl}/auth/signup`,formData)
}

login(formData:Login):Observable<any>{
  return this._http.post(`${Environment.baseUrl}/auth/signin`,formData)
  }

userData:BehaviorSubject<any> = new BehaviorSubject(null)
userInformation(){
let decoded = jwtDecode(JSON.stringify(localStorage.getItem('userToken')))
this.userData.next(decoded)
}

forgotPassword(email:string):Observable<any>{
  return this._http.post(`${Environment.baseUrl}/auth/forgotPasswords`,{
    email:email
  })
  }
  verifyResetCode(resetCode:string):Observable<any>{
    return this._http.post(`${Environment.baseUrl}/auth/verifyResetCode`,{
      resetCode:resetCode
    })
    } 
    changeMyPassword(passwordForm:ForgotPassword):Observable<any>{
    return this._http.put(`${Environment.baseUrl}/users/changeMyPassword`,passwordForm)
    } 
    resetPassword(email:string, newPassword:string):Observable<any>{
    return this._http.put(`${Environment.baseUrl}/auth/resetPassword`,{
      email:email,
      newPassword:newPassword
    })
    } 
}


import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

isLoading:boolean =false
errMsg:string=''

constructor(private _auth:AuthService,private _Router:Router){
}


loginForm:FormGroup = new FormGroup({
email: new FormControl(null,[Validators.required,Validators.email]),
password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6}$/)]),
})


sendData(){
this.isLoading = true;
this._auth.login(this.loginForm.value).subscribe({
next:(response)=>{
if(response.message == 'success'){
this._Router.navigate(['/home'])
localStorage.setItem('userToken', response.token)
this._auth.userInformation()
this.isLoading = false
}
},
error:(err)=>{
this.errMsg = err.error.message;
this.isLoading = false;
},
})
}

clearForm(){
  this.loginForm.reset();
}
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
isLoading:boolean =false
errMsg:string=''

constructor(private _auth:AuthService,private _Router:Router){
}


registerForm:FormGroup = new FormGroup({
name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
email: new FormControl(null,[Validators.required,Validators.email]),
phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[1250][0-9]{8}$/)]),
password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6}$/)]),
rePassword:  new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6}$/)])
})


sendData(){
this.isLoading = true;
this._auth.register(this.registerForm.value).subscribe({
next:(response)=>{
if(response.message == 'success'){
this._Router.navigate(['/login'])
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
  this.registerForm.reset();
}

}

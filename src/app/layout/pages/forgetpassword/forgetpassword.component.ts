import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  isLoading: boolean = false
  errMsg: any;
  successMsg: any;
  steps:number=1
  constructor(private _auth: AuthService, private _Router: Router) { }

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)]),
  })
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}$/)])
  })

  verifyResetCode(){
    this.isLoading = true
    this._auth.verifyResetCode(this.verifyCode.value.resetCode).subscribe(
      {
        next: (response) => {
          console.log(response)
          if (response.status == 'Success') {
            this.errMsg = ''
            this.steps=3
            this.successMsg=response.status
            this.isLoading = false
          }
        },
        error: (err) => {
          this.successMsg=''
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      }
    )
  }

  resetNewPassword(){
    this.isLoading = true
    this._auth.resetPassword(this.resetPassword.value.email,this.resetPassword.value.newPassword).subscribe(
      {
        next: (response) => {
          if (response.token) {
            this._Router.navigate(['/home'])
            localStorage.setItem('userToken', response.token)
            this._auth.userInformation()
            this.isLoading = false
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      }
    )

  }
  sendData() {
    this.isLoading = true
    this._auth.forgotPassword(this.forgetPasswordForm.value.email).subscribe(
      {
        next: (response) => {
          if (response.statusMsg == 'success') {
            this.steps=2
            this.successMsg=response.message
            this.isLoading = false
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      }
    )
  }
}

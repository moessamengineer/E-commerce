import { Component } from '@angular/core';
import  {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLogin:boolean = false
  constructor(private _auth:AuthService,private _Router:Router){

  }
  ngOnInit():void{
    this._auth.userData.subscribe(()=>{ 
      if(this._auth.userData.getValue() == null)
        {
          this.isLogin=false;
        }else{
          this.isLogin=true;
        }
    })
  }
  logout(){
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
    this._auth.userData.next(null)
  }

}

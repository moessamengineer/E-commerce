import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CartService } from '../../../shared/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLogin: boolean = false;
  cartItemCount!: number;
  subscription!: Subscription;

  constructor(private _auth: AuthService, private _Router: Router, private _cart: CartService) { }

  ngOnInit(): void {
    this._auth.userData.subscribe(() => {
      if (this._auth.userData.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        this.updateCartValue();
      }
    });

    this.subscription = this._cart.cartItemCountChanged.subscribe((count: number) => {
      this.cartItemCount = count;
    });
  }

  updateCartValue() {
    this._auth.getCartItemCount().subscribe({
      next: (res) => {
        this.cartItemCount = res.numOfCartItems;
      }
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
    this._auth.userData.next(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
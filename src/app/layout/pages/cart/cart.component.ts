import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,RouterLink,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartData: any = {};

  constructor(private _cart: CartService,private _auth:AuthService) { }

  ngOnInit() {
    this._cart.GetProducts().subscribe({
      next: (res) => {
        this._auth.cartItemNumber.next(res.numOfCartItems)
        this.cartData = res.data;
      }
    });
  }

  removeProduct(product: any) {
    this._cart.DeleteProductINCart(product).subscribe({
      next: (res) => {
        this._cart.GetProducts().subscribe({
          next: (res) => {
            this._auth.cartItemNumber.next(res.numOfCartItems)
            this.cartData = res.data;
          }
        });
      }
    });
  }

  UpdateQuantityProduct(id:string, count:number){
    this._cart.UpdateProductInCart(id,count).subscribe({
      next: (res) => {
        console.log(res)
        this._cart.GetProducts().subscribe({
          next: (res) => {
            this._auth.cartItemNumber.next(res.numOfCartItems)
            this.cartData = res.data;
          }
        });
      }
    })
  
  }
  clearCart() {
    this._cart.ClearUserCart().subscribe({
      next: (res) => {
        this._cart.GetProducts().subscribe({
          next: (res) => {
            this._auth.cartItemNumber.next(res.numOfCartItems)
            this.cartData = res.data;
          }
        });
      }
    });
  }

  checkout() {
    // implement checkout logic here
  }

}
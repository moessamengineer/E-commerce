import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartData: any = {};

  constructor(private _cart: CartService) { }

  ngOnInit() {
    this._cart.GetProducts().subscribe({
      next: (res) => {
        this.cartData = res.data;
      }
    });
  }

  removeProduct(product: any) {
    this._cart.DeleteProductINCart(product).subscribe({
      next: (res) => {
        this._cart.GetProducts().subscribe({
          next: (res) => {
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
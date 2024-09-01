import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../../shared/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { RootObject } from '../../../shared/interface/product';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NgFor, RouterLink,NgClass,NgIf],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  constructor(private _product:ProductService,private _cart:CartService,private _toaster:ToastrService,private _auth:AuthService, private _wishlist:WishListService)
{
}
wishlist:RootObject[]=[]
ngOnInit():void{
  this.getWishList()
}

getWishList(){
  this._wishlist.GetWishList().subscribe({
    next: (respone) => {
      this.wishlist=respone.data
    },
  error:()=>{}})
}
addToCart(event: Event,id:string){
  event.stopPropagation();
  this._cart.AddProductToCart(id).subscribe({
    next:(res)=>{
      this._auth.cartItemNumber.next(res.numOfCartItems)
      this._toaster.success(res.message,'',{
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    }
  })
}
isProductInWishlist(productId: any): boolean {
  return this.wishlist.some((product) => product.id === productId);
}
toggleWishlist(event: any, product: any): void {
  event.stopPropagation();
  const index = this.wishlist.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    this.wishlist.splice(index, 1);
  }
  this.removeFromWishList(product.id);
}
removeFromWishList(product: any) {
  this._wishlist.DeleteProductformWishList(product).subscribe({
    next:(res)=>{
      this._toaster.success(res.message,'',{
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    }
  });
}
addToWishList(id:string){
  this._wishlist.AddProductToWishList(id).subscribe({
    next:(res)=>{
      this._toaster.success(res.message,'',{
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    }
  })
}

}

import { afterNextRender, Component, NgModule } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { RootObject } from '../../../shared/interface/product';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSliderComponent } from "../../additions/main-slider/main-slider.component";
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { CartService } from '../../../shared/services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { WishListService } from '../../../shared/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgClass, FormsModule, RouterLink, NgIf, MainSliderComponent, CategorySliderComponent,ToastrModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productList:RootObject[]=[]
  filteredProducts:RootObject[] = [];
  wishlist: RootObject[] = [];
  searchTerm = '';
constructor(private _product:ProductService,private _cart:CartService,private _toaster:ToastrService,private _auth:AuthService,private _wishlist:WishListService)
{
  
}
ngOnInit():void{
  this.getAllProduct()
  this.getWishList()
  
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
getAllProduct(){
  this._product.GetProducts().subscribe({
    next: (respone) => {
      this.productList=respone.data
      this.productList.forEach((product: any) => {
        product.isInWishlist = this.isProductInWishlist(product.id);
      });
      this.filterProducts();
    },
  error:()=>{}})
}
filterProducts(): void {
  this.filteredProducts = this.productList.filter(product => {
    return product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  });
}
getWishList(){
  this._wishlist.GetWishList().subscribe({
    next: (respone) => {
      this.wishlist=respone.data
    },
  error:()=>{}})
}
isProductInWishlist(productId: any): boolean {
  return this.wishlist.some((product) => product.id === productId);
}
toggleWishlist(event: any, product: any): void {
  event.stopPropagation();
  product.isInWishlist = !product.isInWishlist;
  if (product.isInWishlist) {
    this.addToWishList(product.id);
  } else {
    this.removeFromWishList(product.id);
  }
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

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ProductDetails, RootObject } from '../../../shared/interface/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, NgFor],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  id!:string
  productDetails!:ProductDetails
  constructor(private _route:ActivatedRoute , private _productService:ProductService, private _cart:CartService,private _toaster:ToastrService,private _auth:AuthService) {

  }
ngOnInit():void{
  this._route.params.subscribe((p)=>{
this.id=p['id']
this._productService.GetSpecificProduct(this.id).subscribe({
  next: (respone) => {this.productDetails=respone.data
  },
error:()=>{}})
  })
}
addToCart(id:string){
  this._cart.AddProductToCart(id).subscribe({
    next:(res)=>{
      this._auth.cartItemNumber.next(res.numOfCartItems)
      this._toaster.success(res.message)}
  })
}
}

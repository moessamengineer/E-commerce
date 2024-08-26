import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { RootObject } from '../../../shared/interface/product';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSliderComponent } from "../../additions/main-slider/main-slider.component";
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { CartService } from '../../../shared/services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, MainSliderComponent, CategorySliderComponent,ToastrModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productList:RootObject[]=[]
constructor(private _product:ProductService,private _cart:CartService,private _toaster:ToastrService)
{
}
ngOnInit():void{
  this.getAllProduct()
}
addToCart(event: Event,id:string){
  event.stopPropagation();
  this._cart.AddProductToCart(id).subscribe({
    next:(res)=>{
      this._toaster.success(res.message)
    }
  })
}
getAllProduct(){
  this._product.GetProducts().subscribe({
    next: (respone) => {this.productList=respone.data},
  error:()=>{}})
}
}

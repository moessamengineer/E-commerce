import { afterNextRender, Component, NgModule } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { RootObject } from '../../../shared/interface/product';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSliderComponent } from "../../additions/main-slider/main-slider.component";
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { CartService } from '../../../shared/services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink, NgIf, MainSliderComponent, CategorySliderComponent,ToastrModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productList:RootObject[]=[]
  filteredProducts:RootObject[] = [];
  searchTerm = '';
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
      this.filterProducts();
    },
  error:()=>{}})
}
filterProducts(): void {
  this.filteredProducts = this.productList.filter(product => {
    return product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  });
}
}

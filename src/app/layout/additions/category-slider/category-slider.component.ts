import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../../shared/services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule,NgFor ],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent { 
  categoryList:any[]=[]
  constructor(private _data:ProductService){

  }
  ngOnInit():void{
    this.getCategories()
  }
  getCategories(){
    this._data.GetCategories().subscribe((res)=>{
      
      this.categoryList = res.data
    })
  }

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
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

}

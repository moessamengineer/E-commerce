import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _product:ProductService) { }

  categories!: any[];
  ngOnInit(): void { 
    this.getCategories()
    
      };
      getCategories(){
        this._product.GetCategories().subscribe({
          next:(res)=>{
            this.categories=res.data;
          }
        })
  }

}

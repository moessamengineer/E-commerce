import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  constructor(private _product:ProductService) { }

  brands!: any[];
  ngOnInit(): void { 
    this.getbrands()
    
      };
      getbrands(){
        this._product.GetBrands().subscribe({
          next:(res)=>{
            this.brands=res.data;
          }
        })
  }


}

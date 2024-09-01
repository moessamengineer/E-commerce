import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor,NgClass,RouterLink,NgIf,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent extends HomeComponent {

}

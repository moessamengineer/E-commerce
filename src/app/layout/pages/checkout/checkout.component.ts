import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../shared/services/payment.service';
import { CartService } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartId!: string;
  paymentMethods = [
    { value: 'visa', label: 'Visa' },
    { value: 'cash', label: 'Cash' }
  ];

  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    paymentMethod: new FormControl(null, Validators.required)
  });

  constructor(private _payment: PaymentService, private _cart: CartService,private _router:Router) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this._cart.GetProducts().subscribe({
      next: (res) => {
        this.cartId = res.data._id;
      }
    });
  }

  submitData(): void {
    if (this.checkoutForm.get('paymentMethod')?.value === 'visa') {
      this._payment.checkoutVisa(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
            window.location.href = res.session.url;
        }
      });
    } else {
      this._payment.checkoutCash(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          this._router.navigate(['/allorders']);
        }
      });
    }
  }
}
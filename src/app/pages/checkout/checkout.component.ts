import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  paymentForm!: FormGroup;
  couponStatus: boolean = false;

  constructor(
    private _CartService: CartService,
    private _MessageService: MessageService,
    private _ConfirmationService: ConfirmationService,
    private _TranslateService: TranslateService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.setPaymentForm();
    this.getCart();
    this.getTotalPrice();
  }

  toggleCouponSection(e: HTMLElement) {
    this.couponStatus = !this.couponStatus;
  }

  cart: IProduct[] = [];
  getCart() {
    this.cart = this._CartService.cart.value;
  }

  getTotalPrice() {
    this.totalPrice = this._CartService.calcCartPrice(
      this._CartService.cart.value
    );
  }

  selectedPayment: string = 'bank';
  choosePaymentMethod(e: any) {
    this.selectedPayment = e.target.value;
    this.paymentForm.controls.paymentMethod.patchValue(this.selectedPayment);
  }

  selectedShipping: string = 'free';
  chooseShippingMethod(e: any) {
    this.selectedShipping = e.target.value;
    this.paymentForm.controls.shippingMethod.patchValue(this.selectedShipping);
  }

  setPaymentForm() {
    this.paymentForm = new FormGroup({
      // firstName: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      country: new FormControl('مصر', [Validators.required]),
      address1: new FormControl(null, [Validators.required]),
      // address2: new FormControl(null),
      location: new FormControl(null, [
        Validators.pattern(
          `(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})`
        ),
      ]),
      city: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\d]{11}$'),
      ]),
      email: new FormControl(null, [ Validators.email]),
      notes: new FormControl(''),
      coupon: new FormControl(null),
      paymentMethod: new FormControl(null),
      shippingMethod: new FormControl(null),
    });
  }

  processToCheckout(paymentForm: FormGroup) {
    if (paymentForm.valid) {
      if (this.getOrders().length > 0) {
        paymentForm.setErrors({'incorrect': true})
        const form = {
          name: paymentForm.value.company,
          email: paymentForm.value.email,
          mobile: paymentForm.value.mobile,
          location: paymentForm.value.location,
          address:
            paymentForm.value.country +
            ' - ' +
            paymentForm.value.city +
            ' - ' +
            paymentForm.value.address1,
            // ' - ' +
            // paymentForm.value.address2,
          total_order_price: this.totalPrice,
          paymentType: this.selectedPayment,
          shippingType: this.selectedShipping,
          notes:paymentForm.value.notes,
          order_products: this.getOrders(),
        };
        this._CartService.checkout(form).subscribe({
          next: (res) => {
            if (res.status == 1) {
              this.confirm(res.message);
              this._CartService.clearCart();
              paymentForm.reset()
            } else {
              this._MessageService.add({
                severity: 'warn',
                detail: res.message,
              });
            }
          },
        });
      } else {
        if (this._TranslateService.currentLang == 'ar') {
          this._MessageService.add({
            severity: 'warn',
            summary: 'لا يوجد منتجات',
            detail: 'لا يمكن متابعه عمليه الدفع',
          });
        } else {
          this._MessageService.add({
            severity: 'warn',
            summary: 'There are no products',
            detail: 'The payment cannot be proceeded',
          });
        }
      }
    }
  }

  getOrders() {
    let order: any[] = [];
    this.cart.forEach((e) => {
      order.push({
        product_id: e.id,
        price: e.price,
        total_price: e.price * (e.count ? e.count : 1),
        count: e.count ? e.count : 1,
      });
    });
    return order;
  }

  confirm(message: string) {
    if (this._TranslateService.currentLang == 'ar') {
      this._ConfirmationService.confirm({
        message: message,
        header: 'رساله تأكيد',
        acceptLabel: 'تأكيد',
        icon: 'pi pi-info-circle mx-3',
        accept: () => {
          this._MessageService.add({
            severity: 'success',
            summary: 'الدفع',
            detail: message,
          });
          this._Router.navigate(['home']);
        },
        reject: () => {
          this._MessageService.add({
            severity: 'success',
            summary: 'الدفع',
            detail: message,
          });
          this._Router.navigate(['home']);
        },
      });
    } else {
      this._ConfirmationService.confirm({
        message: message,
        header: 'Confirmation',
        acceptLabel: 'Confirm',
        icon: 'pi pi-info-circle mx-3',
        accept: () => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Payment',
            detail: message,
          });
          this._Router.navigate(['home']);
        },
        reject: () => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Payment',
            detail: message,
          });
          this._Router.navigate(['home']);
        },
      });
    }
  }

  applyCoupon(){
    if (this._TranslateService.currentLang == 'ar') {
      this._MessageService.add({
        severity: 'warn',
        summary: 'القسيمة',
        detail: 'نأسف هذه القسيمة غير صالحة',
      });
    }
    else{
      this._MessageService.add({
        severity: 'warn',
        summary: 'Coupon',
        detail: 'Sorry this coupon is not valid',
      });
    }
  }
}

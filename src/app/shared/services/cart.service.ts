import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { IProduct } from '../interfaces/product';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: BehaviorSubject<IProduct[] | any> = new BehaviorSubject<IProduct[]>([]);

  constructor(
    private _TranslateService: TranslateService,
    private _LocalService: LocalService,
    private _ApiService: ApiService
  ) {}

  addToCart(product: IProduct) {
    if (!this.getCartItems().some((el) => el.id === product.id)) {
      this.cart.next(this.cart.getValue().concat([product]));
      this.saveCartToStorage(this.cart.getValue());
      return true;
    }
    return false;
  }

  getCartItems(): IProduct[] {
    return this.cart.value;
  }

  addItemNotify(product: IProduct) {
    let notify: object;
    if (this._TranslateService.currentLang == 'ar') {
      notify = {
        severity: 'info',
        summary: 'تم تحديث السله',
        detail: `تمت إضافة منتج (${product.name}) بنجاح إلى سلة التسوق الخاصة بك`,
      };
    } else {
      notify = {
        severity: 'info',
        summary: 'Cart Updated',
        detail: `A product (${product.name}) has been added successfully to your cart`,
      };
    }
    return notify;
  }

  warningMessageService() {
    let notify: object;
    if (this._TranslateService.currentLang == 'ar') {
      notify = {
        severity: 'warn',
        summary: 'أشعار عن السله',
        detail: `هذا المنتج يوجد بالفعل في سلتك`,
      };
    } else {
      notify = {
        severity: 'warn',
        summary: 'Cart Notification',
        detail: `This product is already in your cart`,
      };
    }
    return notify;
  }

  getCartCount(): number {
    return this.cart.value.length;
  }

  saveCartToStorage(cart: IProduct[]) {
    this._LocalService.setJsonValue('aboSteet_cart', cart);
  }

  getCartFromStorage(): IProduct[] {
    return this._LocalService.getJsonValue('aboSteet_cart');
  }

  clearCart() {
    this._LocalService.removeItem('aboSteet_cart');
    this.cart.next([]);
  }

  calcCartPrice(arr: IProduct[]): number {
    if (arr.length > 0) {
      const prices = arr.map(
        (product: IProduct) =>
          product.price * (product.quantity)
      );
      return prices.reduce((acc: number, curr: number) => acc + curr);
    }
    return 0;
  }

  updateCart(id: number) {
    this.cart.next(this.cart.value.filter((p: IProduct) => p.id != id));
    this.saveCartToStorage(this.cart.getValue());
  }

  increaseItem(item: IProduct) {
    item.quantity += item.min_quantity;
    this.cart.next(this.cart.value);
    this.saveCartToStorage(this.cart.getValue());
  }

  decreaseItem(item: IProduct) {
    if (item.quantity > item.min_quantity) {
      item.quantity = item.quantity - item.min_quantity;
      this.cart.next(this.cart.value);
      this.saveCartToStorage(this.cart.getValue());
    }
  }

  deleteItemNotify(product: IProduct) {
    let notify: object;
    if (this._TranslateService.currentLang == 'ar') {
      notify = {
        severity: 'warn',
        summary: 'أشعار عن السله',
        detail: `تم أزاله (${product.name}) من السله`,
      };
    } else {
      notify = {
        severity: 'warn',
        summary: 'Cart Notification',
        detail: `This product (${product.name}) has been removed from cart`,
      };
    }
    return notify;
  }

  // *********************************************
  checkout(checkoutForm: any): Observable<{
    message: string;
    status: number;
    data: any;
  }> {
    return this._ApiService.postReq('checkOut', checkoutForm);
  }
}

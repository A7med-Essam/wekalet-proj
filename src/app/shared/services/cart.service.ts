import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: BehaviorSubject<IProduct[] | any> = new BehaviorSubject<IProduct[]>([]);

  constructor(
    private _TranslateService: TranslateService,
    private _LocalService: LocalService
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

  addMessageService(product: IProduct) {
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

  calcCartPrice(res: IProduct[]): number {
    if (res.length > 0) {
      const prices = res.map((product: IProduct) => product.price*(product.count?product.count:1));
      return prices.reduce((acc: number, curr: number) => acc + curr);
    }
    return 0;
  }

  updateCart(id: number) {
    this.cart.next(this.cart.value.filter((p: IProduct) => p.id != id));
    this.saveCartToStorage(this.cart.getValue());
  }

  increaseItem(item: IProduct, count: number) {
    item.count = count+1
    this.cart.next(this.cart.value)
    this.saveCartToStorage(this.cart.getValue());
  }

  decreaseItem(item: IProduct, count: number) {
    if (item.count && item.count > 1) {
      item.count = count-1
      this.cart.next(this.cart.value)
      this.saveCartToStorage(this.cart.getValue());
    }
  }
}

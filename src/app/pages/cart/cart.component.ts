import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  cart: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private _CartService: CartService,private _MessageService:MessageService, private _TranslateService:TranslateService) {}

  ngOnInit(): void {
    this._CartService.cart.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res) => {
        this.cart = res;
        this.totalPrice = this._CartService.calcCartPrice(res);
      },
    });
  }

  clearCart() {
    this._CartService.clearCart();
  }

  increaseItem(item: IProduct, count: number) {
    this._CartService.increaseItem(item, count);
  }
  
  decreaseItem(item: IProduct, count: number) {
    this._CartService.decreaseItem(item, count);
  }

  updateCart(product: IProduct) {
    this._CartService.updateCart(product.id);
    this._MessageService.add(this._CartService.deleteItemNotify(product));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  cart: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private _CartService: CartService) {}

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

  updateCart(id: number) {
    this._CartService.updateCart(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

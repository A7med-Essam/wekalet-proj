import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  totalPrice: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _CartService: CartService
  ) {}

  cart: IProduct[] = [];
  ngOnInit(): void {
    this._CartService.cart.next(
      this._CartService.getCartFromStorage()
        ? this._CartService.getCartFromStorage()
        : []
    );
    this._CartService.cart.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res) => {
        this.cart = res;
        this.cartCount = res.length;
        this.totalPrice = this._CartService.calcCartPrice(res);
      },
    });
  }

  openSidebar(navbar: HTMLElement) {
    navbar.classList.add('open');
    this.document.body.classList.add('open');
  }

  closeSidebar(navbar: HTMLElement) {
    navbar.classList.remove('open');
    this.document.body.classList.remove('open');
  }

  openCart(cartSidebar: HTMLElement) {
    cartSidebar.classList.add('open');
    this.document.body.classList.add('open');
  }

  closeCart(cartSidebar: HTMLElement) {
    cartSidebar.classList.remove('open');
    this.document.body.classList.remove('open');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateCart(id: number) {
    this._CartService.updateCart(id);
  }

  increaseItem(item: IProduct, count: number) {
    this._CartService.increaseItem(item, count);
  }
  
  decreaseItem(item: IProduct, count: number) {
    this._CartService.decreaseItem(item,count)
  }
}

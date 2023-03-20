import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { I18nService } from 'src/app/shared/i18n/i18n.service';
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
    private _CartService: CartService,
    private _MessageService:MessageService,
    private _I18nService:I18nService,
    private _TranslateService:TranslateService
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

  toggleProfileList(profileModal: HTMLElement) {
    profileModal.classList.toggle('open');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateCart(product: IProduct) {
    this._CartService.updateCart(product.id);
    this._MessageService.add(this._CartService.deleteItemNotify(product));
  }

  increaseItem(item: IProduct) {
    this._CartService.increaseItem(item);
  }
  
  decreaseItem(item: IProduct) {
    this._CartService.decreaseItem(item)
  }

  changeLang(){
    if (this._I18nService.currentLang == 'ar') {
      this._I18nService.changeCurrentLang(this._TranslateService,'en')
    } else {
      this._I18nService.changeCurrentLang(this._TranslateService,'ar')
    }
    this._I18nService.saveCurrentLang(this._TranslateService)
  }
}

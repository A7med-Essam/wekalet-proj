import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory, IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _CategoryService: CategoryService,
    private _ProductService: ProductService,
    private _Router: Router,
    private _MessageService: MessageService,
    private _CartService: CartService
  ) {}
  private unsubscribe$ = new Subject<void>();
  @Input() currentProduct!: IProduct;
  ngOnInit(): void {
    this._CategoryService.categories
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          res ? (this.categories = res) : this.getCategories();
        },
      });

    this._ProductService.products.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res) => {
        res ? (this.products = res) : this.getProducts();
      },
    });
  }

  categories: ICategory[] = [];
  getCategories() {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data.data;
        this._CategoryService.categories.next(res.data.data);
      },
    });
  }

  displayProductsByCategoryId(id: number) {
    this._CategoryService.categoryId.next(id);
    this._Router.navigate(['./products']);
  }

  products: IProduct[] = [];
  getProducts() {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data.data.slice(0, 8);
        this._ProductService.products.next(res.data.data);
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  productDetailsStatus: boolean = false;
  displayDetails(item: IProduct) {
    this.productDetailsStatus = true;
    this.currentProduct = item;
  }

  onCloseModal(e: boolean) {
    this.productDetailsStatus = e;
  }

  // cart methods
  addToCart(product: IProduct) {
    if (this._CartService.addToCart(product)) {
      this._MessageService.add(this._CartService.addItemNotify(product));
    } else {
      this._MessageService.add(this._CartService.warningMessageService());
    }
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categoryFilterBtn: boolean = false;
  genderFilterBtn: boolean = false;
  colorsFilterBtn: boolean = false;
  sizeFilterBtn: boolean = false;
  priceFilterBtn: boolean = false;
  constructor(
    private _CategoryService: CategoryService,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _MessageService: MessageService
  ) {}

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getCategoryId();
  }

  toggleFilterBtn(type: string, e: MouseEvent) {
    if (e?.target != null) {
      (e.target as any).parentElement.classList.toggle('active');
      switch (type.toLowerCase()) {
        case 'categories':
          this.categoryFilterBtn = !this.categoryFilterBtn;
          break;
        case 'gender':
          this.genderFilterBtn = !this.genderFilterBtn;
          break;
        case 'colors':
          this.colorsFilterBtn = !this.colorsFilterBtn;
          break;
        case 'size':
          this.sizeFilterBtn = !this.sizeFilterBtn;
          break;
        default:
          this.priceFilterBtn = !this.priceFilterBtn;
          break;
      }
    }
  }

  toggleClass(event: MouseEvent | any, className: string) {
    const hasClass = event.currentTarget.classList.contains(className);
    if (hasClass) {
      event.currentTarget.classList.remove(className);
    } else {
      event.currentTarget.classList.add(className);
    }
  }

  getCategoryId() {
    this._CategoryService.categoryId
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.getProductsByCategoryId(res);
          } else {
            this.getProducts();
          }
        },
      });
  }

  ngOnDestroy(): void {
    this._CategoryService.categoryId.next(0);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  products: IProduct[] = [];
  getProducts() {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data.data;
      },
    });
  }

  getProductsByCategoryId(id: number) {
    this._ProductService.getProductsByCategoryId(id).subscribe({
      next: (res) => {
        this.products = res.data.data;
      },
    });
  }

  // =============
  @Input() currentProduct!: IProduct;
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
      this._MessageService.add(this._CartService.addMessageService(product));
    } else {
      this._MessageService.add(this._CartService.warningMessageService());
    }
  }
}

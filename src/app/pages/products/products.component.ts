import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    private _ProductService: ProductService
  ) {}

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getCategoryId();
  }

  toggleFilterBtn(type: string, e: any) {
    e.target.parentElement.classList.toggle('active');
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

  toggleClass(event: any, className: string) {
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

  products: any[] = [];
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
}

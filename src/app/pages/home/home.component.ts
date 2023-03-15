import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    private _Router: Router
  ) {}
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this._CategoryService.categories
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          res ? (this.categories = res) : this.getCategories();
        },
      });

      this._ProductService.products
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          res ? (this.products = res) : this.getProducts();
        },
      });
  }

  categories: any[] = [];
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

  products: any[] = [];
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
}

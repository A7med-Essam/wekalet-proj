import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {
        history.pushState("", document.title, window.location.pathname
    + window.location.search);
  }
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

 
    this.getProducts_men();
    this.getProducts_women();
    this.getProducts_kids();
    this.getProducts_shoes();
  }

  categories: ICategory[] = [];
  getCategories() {
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data.data;
        this._CategoryService.categories.next(res.data.data);
        this._ActivatedRoute.queryParams.subscribe({
          next: (res) => {
            if (res?.قسم) {
              switch (res.قسم) {
                case 'الرجالي':
                  this.categories.forEach((e) => {
                    if (e.name == 'رجالي' || e.name == 'Men') {
                      this.displayProductsByCategoryId(e.id);
                    }
                  });
                  break;
                case 'الحريمي':
                  this.categories.forEach((e) => {
                    if (e.name == 'حريمي' || e.name == 'Women') {
                      this.displayProductsByCategoryId(e.id);
                    }
                  });
                  break;
                case 'الاطفالي':
                  this.categories.forEach((e) => {
                    if (e.name == 'أطفالي' || e.name == 'Kids') {
                      this.displayProductsByCategoryId(e.id);
                    }
                  });
                  break;
                case 'الشباشب والصنادل':
                  this.categories.forEach((e) => {
                    if (e.name == 'شباشب و صنادل' || e.name == 'Slippers') {
                      this.displayProductsByCategoryId(e.id);
                    }
                  });
                  break;
                case 'الرياضي':
                  this.categories.forEach((e) => {
                    if (e.name == 'رياضي' || e.name == 'Sports') {
                      this.displayProductsByCategoryId(e.id);
                    }
                  });
                  break;
                case 'الأحذية':
                  this.categories.forEach((e) => {
                    if (e.name == 'أحذية' || e.name == 'Shose') {
                      this.displayProductsByCategoryId(e.id);
                    }
                  });
                  break;
                default:
                  break;
              }
            }
          },
        });
      },
    });
  }

  displayProductsByCategoryId(id: number) {
    this._CategoryService.categoryId.next(id);
    this._Router.navigate(['./products']);
  }

  products_men: IProduct[] = [];
  getProducts_men() {
    this._ProductService.getProductsById([2]).subscribe({
      next: (res) => {
        this.products_men = res.data.data;
      },
    });
  }

  products_women: IProduct[] = [];
  getProducts_women() {
    this._ProductService.getProductsById([3]).subscribe({
      next: (res) => {
        this.products_women = res.data.data;
      },
    });
  }

  products_kids: IProduct[] = [];
  getProducts_kids() {
    this._ProductService.getProductsById([1]).subscribe({
      next: (res) => {
        this.products_kids = res.data.data;
      },
    });
  }

  products_shoes: IProduct[] = [];
  getProducts_shoes() {
    this._ProductService.getProductsById([4,5,6]).subscribe({
      next: (res) => {
        this.products_shoes = res.data.data;
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

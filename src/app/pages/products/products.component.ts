import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFilterOptions, IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  categoryFilterBtn: boolean = false;
  genderFilterBtn: boolean = false;
  colorsFilterBtn: boolean = false;
  sizeFilterBtn: boolean = false;
  priceFilterBtn: boolean = false;
  constructor(
    private _CategoryService: CategoryService,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _TranslateService: TranslateService,
    private _MessageService: MessageService
  ) {}
  rangeValues: number[] = [1000, 5000];

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this._ProductService.filterOptions
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          res ? (this.filterOptions = res) : this.getFilterOptions();
        },
      });
    this.getCategoryId();
  }

  toggleFilterBtn(type: string, e: MouseEvent) {
    if (e?.target != null) {
      (e.target as any).parentElement.classList.toggle('active');
      switch (type.toLowerCase()) {
        case 'categories':
          this.categoryFilterBtn = !this.categoryFilterBtn;
          this.selectedCategories = [];
          break;
        case 'gender':
          this.genderFilterBtn = !this.genderFilterBtn;
          this.selectedGenders = [];
          break;
        case 'colors':
          this.colorsFilterBtn = !this.colorsFilterBtn;
          this.selectedColors = [];
          break;
        case 'size':
          this.sizeFilterBtn = !this.sizeFilterBtn;
          this.selectedSizes = [];
          break;
        default:
          this.priceFilterBtn = !this.priceFilterBtn;
          this.selectedPrices = [];
          break;
      }
    }
  }

  toggleClass(event: MouseEvent | any, className: string) {
    const hasClass = event.currentTarget.classList.contains(className);
    if (hasClass) {
      event.currentTarget.classList.remove(className);
      this.setFilters(
        event.currentTarget.children[0].getAttribute('name'),
        event.currentTarget.children[0].getAttribute('val'),
        false
      );
    } else {
      event.currentTarget.classList.add(className);
      this.setFilters(
        event.currentTarget.children[0].getAttribute('name'),
        event.currentTarget.children[0].getAttribute('val'),
        true
      );
    }
  }

  currentCategoryId: number = 0;
  getCategoryId() {
    this._CategoryService.categoryId
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.currentCategoryId = res;
            this.getProductsByCategoryId(res);
            this.categoryFilterBtn = true;
            this.selectedCategories.push(this.currentCategoryId)
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
  currentPage: number = 1;
  pagination: any;
  skeletonStatus: boolean = true;
  perPage: number[] = [];
  getProducts(page: number = 1) {
    this._ProductService.getProducts(page).subscribe({
      next: (res) => {
        this.skeletonStatus = false;
        this.products = res.data.data;
        this.pagination = res.data;
        this.currentPage = res.data.current_page;
        // this.perPage = Array(res.data.per_page).fill(0).map((x,i)=>i);
        this.perPage = Array(6)
          .fill(0)
          .map((x, i) => i);
      },
    });
  }
  skeletonStatus2: boolean = false;
  loadMoreProducts(loadBtn: HTMLAnchorElement) {
    this.skeletonStatus2 = true;
    loadBtn.innerHTML = `<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>`;
    if (this.currentCategoryId != 0) {
      this.currentFilters.category_ids = [this.currentCategoryId];
    }
    this._ProductService
      .filterProducts(this.currentFilters, this.currentPage)
      .subscribe({
        next: (res) => {
          this.skeletonStatus2 = false;
          loadBtn.innerHTML =
            this._TranslateService.instant('buttons.loadMore');
          res.data.data.length > 0 && this.products.push(...res.data.data);
          this.currentPage = res.data.current_page+1;
          res.data.data.length == 0 && this.currentPage--;
          console.log(res.data.total, "TOTAL");
          console.log(this.products.length, " PRODUCT LENGTH");
          if (res.data.total == this.products.length) {
            loadBtn.style.display = 'none';
          }
        },
      });
  }

  getProductsByCategoryId(id: number) {
    this._ProductService.getProductsByCategoryId(id).subscribe({
      next: (res) => {
        this.skeletonStatus = false;
        this.products = res.data.data;
        this.pagination = res.data;
        this.currentPage = res.data.current_page+1
      },
    });
  }

  filterOptions!: IFilterOptions;
  getFilterOptions() {
    this._ProductService.getFilterOptions().subscribe({
      next: (res) => {
        this.filterOptions = res.data;
        this._ProductService.filterOptions.next(res.data);
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
      this._MessageService.add(this._CartService.addItemNotify(product));
    } else {
      this._MessageService.add(this._CartService.warningMessageService());
    }
  }

  // filter
  selectedSizes: any = [];
  selectedGenders: any = [];
  selectedColors: any = [];
  selectedCategories: any = [];
  selectedPrices: any = [];
  currentFilters: any = {
    category_ids: null,
    size_ids: null,
    color_ids: null,
    gender_ids: null,
  };
  ApplyFilter() {
    this.scrollToElement();
    this.skeletonStatus = true;
    const filters = {
      category_ids: this.selectedCategories,
      size_ids: this.selectedSizes,
      color_ids: this.selectedColors,
      gender_ids: this.selectedGenders,
    };
    filters.category_ids.length == 0 && (filters.category_ids = null);
    filters.size_ids.length == 0 && (filters.size_ids = null);
    filters.color_ids.length == 0 && (filters.color_ids = null);
    filters.gender_ids.length == 0 && (filters.gender_ids = null);
    this._ProductService.filterProducts(filters).subscribe({
      next: (res) => {
        this.pagination = res.data;
        this.currentPage = res.data.current_page;
        this.currentFilters = filters;
        this.products = res.data.data;
        this.skeletonStatus = false;
      },
    });
  }

  setFilters(attr: string, val: number, status: boolean) {
    switch (attr) {
      case 'category':
        status
          ? !this.selectedCategories.includes(Number(val)) &&
            this.selectedCategories.push(Number(val))
          : this.removeFromFilter(this.selectedCategories, Number(val));
        break;
      case 'color':
        status
          ? !this.selectedColors.includes(Number(val)) && this.selectedColors.push(Number(val))
          : this.removeFromFilter(this.selectedColors, Number(val));
        break;
      case 'gender':
        status
          ? !this.selectedGenders.includes(Number(val)) &&
            this.selectedGenders.push(Number(val))
          : this.removeFromFilter(this.selectedGenders, Number(val));
        break;
      case 'size':
        status
          ? !this.selectedSizes.includes(Number(val)) && this.selectedSizes.push(Number(val))
          : this.removeFromFilter(this.selectedSizes, Number(val));
        break;
      default:
        status
          ? !this.selectedPrices.includes(Number(val)) && this.selectedPrices.push(Number(val))
          : this.removeFromFilter(this.selectedPrices, Number(val));
        break;
    }
  }

  removeFromFilter(arr: number[], val: number) {
    const index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  // EmailSubscribe
  getEmailSubscribe(email: HTMLInputElement) {
    if (email.value == '' || email.validationMessage != '') {
      if (this._TranslateService.currentLang == 'ar') {
        this._MessageService.add({
          severity: 'warn',
          summary: 'اشترك من خلال البريد الإلكتروني',
          detail: 'يرجى إدخال البريد الإلكتروني بشكل صحيح',
        });
      } else {
        this._MessageService.add({
          severity: 'warn',
          summary: 'Subscribe via email',
          detail: 'Please enter a valid email',
        });
      }
    } else {
      if (this._TranslateService.currentLang == 'ar') {
        this._MessageService.add({
          severity: 'success',
          summary: 'اشترك من خلال البريد الإلكتروني',
          detail: 'تم الأشتراك بنجاح',
        });
      } else {
        this._MessageService.add({
          severity: 'success',
          summary: 'Subscribe via email',
          detail: 'Subscription completed successfully',
        });
      }
      email.value = '';
    }
  }

  // sort
  sort(event: any) {
    switch (event.target.value) {
      case 'low price':
        this.products.sort(this.sort_by('price', false, parseInt));
        break;
      case 'heigh price':
        this.products.sort(this.sort_by('price', true, parseInt));
        break;
      case 'old':
        this.products.sort(this.sort_by('id', false, parseInt));
        break;
      case 'name':
        this.products.sort(this.sort_by('name', true, parseInt));
        break;
      default:
        this.products.sort(this.sort_by('id', true, parseInt));
        break;
    }
  }

  sort_by = (field: string, reverse: any, primer: any) => {
    const key = primer
      ? function (x: any) {
          return primer(x[field]);
        }
      : function (x: any) {
          return x[field];
        };
    reverse = !reverse ? 1 : -1;
    return function (a: any, b: any) {
      return (
        (a = key(a)), (b = key(b)), reverse * ((a && a > b) - (b && b > a))
      );
    };
  };

  // ============================

  @ViewChild('scrollMe') private scrollMe!: any;

  ngAfterViewInit() {
    // this.elementHeight = this.scrollMe.nativeElement.offsetHeight;
    this.scrollToElement();
  }

  // elementHeight: any;
  scrollToElement(): void {
    window.scroll({
      top: 1000,
      left: 0,
      behavior: 'smooth',
    });
  }
}

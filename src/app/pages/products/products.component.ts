import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFilterOptions, IProduct } from 'src/app/shared/interfaces/product';
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
    this._ProductService.filterOptions
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          res ? (this.filterOptions = res) : this.getFilterOptions();
        },
      });
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
  currentPage:number = 0;
  getProducts(page:number = 1) {
    this._ProductService.getProducts(page).subscribe({
      next: (res) => {
        this.products = res.data.data;
        this.currentPage = res.data.current_page
      },
    });
  }

  loadMoreProducts(){
    this._ProductService.getProducts(this.currentPage+1).subscribe({
      next: (res) => {
        res.data.data.length > 0 && this.products.push(res.data.data)
        this.currentPage = res.data.current_page
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
  ApplyFilter() {
    const filters = {
      category_ids: this.selectedCategories,
      size_ids: this.selectedSizes,
      color_ids: this.selectedColors,
      gender_ids: this.selectedGenders,
    };
    filters.category_ids.length == 0 &&  (filters.category_ids = null)
    filters.size_ids.length == 0 &&  (filters.size_ids = null)
    filters.color_ids.length == 0 &&  (filters.color_ids = null)
    filters.gender_ids.length == 0 &&  (filters.gender_ids = null)
    this._ProductService.filterProducts(filters).subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
  }

  setFilters(attr: string, val: number, status: boolean) {
    switch (attr) {
      case 'category':
        status
          ? !this.selectedCategories.includes(val) &&
            this.selectedCategories.push(val)
          : this.removeFromFilter(this.selectedCategories, val);
        break;
      case 'color':
        status
          ? !this.selectedColors.includes(val) && this.selectedColors.push(val)
          : this.removeFromFilter(this.selectedColors, val);
        break;
      case 'gender':
        status
          ? !this.selectedGenders.includes(val) &&
            this.selectedGenders.push(val)
          : this.removeFromFilter(this.selectedGenders, val);
        break;
      case 'size':
        status
          ? !this.selectedSizes.includes(val) && this.selectedSizes.push(val)
          : this.removeFromFilter(this.selectedSizes, val);
        break;
      default:
        status
          ? !this.selectedPrices.includes(val) && this.selectedPrices.push(val)
          : this.removeFromFilter(this.selectedPrices, val);
        break;
    }
  }

  removeFromFilter(arr: number[], val: number) {
    const index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  // sort
  sortByPrice(){
    this.products = this.products.sort((a, b) => a.price - b.price);
  }
  sortDescending(){
    this.products = this.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
  }
  sortByName(){
    this.products = this.products.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
  })
  }
  // sortByPrice(){}
  sort(event:any){
    // switch (event.target.value) {
    //   case 'price':
    //     this.sortByPrice()
    //     break;
    //     case 'old':
    //       this.sortDescending()
    //       break;
    //       case 'name':
    //         this.sortByName()
    //         break;
    //   default:
    //     break;
    // }

    this.sortDescending()
    console.log(this.products);
  }
}

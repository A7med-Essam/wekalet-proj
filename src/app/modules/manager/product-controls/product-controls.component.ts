import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { retry, takeUntil } from 'rxjs/operators';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ManagerService } from 'src/app/shared/services/manager.service';

@Component({
  selector: 'app-product-controls',
  templateUrl: './product-controls.component.html',
  styleUrls: ['./product-controls.component.scss'],
})
export class ProductControlsComponent implements OnInit, OnDestroy {
  selectedProducts: any[] = [];
  private unsubscribe$ = new Subject<void>();
  products: any[] = [];
  PaginationInfo: any;
  currentPage: number = 1;
  constructor(
    private _ManagerService: ManagerService,
    private _ConfirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  changeProductAvailability() {
    const ids = this.selectedProducts.map((item) => item.id);
    this._ManagerService
      .changeProductAvailability(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.getProducts();
        this.selectedProducts = [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProducts(page: number = 1, paginate?: any) {
    this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
    this._ManagerService
      .getProducts(page, paginate)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.PaginationInfo = res.data;
        this.products = res.data.data;
      });
  }

  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getProducts(e.first / e.rows + 1, e.rows);
  }

  confirm() {
    this._ConfirmationService.confirm({
      message: 'هل انت متأكد؟',
      accept: () => {
        this.changeProductAvailability();
      },
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case '0':
        return 'warning';
      default:
        return 'success';
    }
  }

  filter: number = 0;
  filterActiveProduct(page: number, filter: number) {
    this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
    this._ManagerService
      .filterProducts(page, filter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.filter = this.filter == 0 ? 1 : 0;
        this.PaginationInfo = res.data;
        this.products = res.data.data;
      });
  }
}

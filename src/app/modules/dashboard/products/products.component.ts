import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  PaginationInfo: any;
  products: any[] = [];

  constructor(
    private _DashboardService:DashboardService,
    private _ActivatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private _Router: Router,
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page: number = 1, paginate?: any) {
      this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
      this._DashboardService.getProducts(page, paginate).subscribe((res) => {
        this.PaginationInfo = res.data;
        this.products = res.data.data;
      });
  }

  currentPage: number = 1;
  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getProducts(e.first / e.rows + 1, e.rows);
  }

  showRow(e: number) {
    this._DashboardService.ProductId.next(e);
    this._Router.navigate(['details'], { relativeTo: this._ActivatedRoute });
  }

  confirm(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteRow(id);
      },
    });
  }

  deleteRow(id: number) {
    this._DashboardService.deleteRow(id).subscribe((res:any) => {
      this.getProducts();
    });
  }
}

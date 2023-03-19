import { Component, OnInit } from '@angular/core';
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
    private _DashboardService:DashboardService
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
}

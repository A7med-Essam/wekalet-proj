import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _ApiService: ApiService) {}

  OrderId:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getOrders(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/orders?page=${page}`, {
      paginate: paginate,
    });
  }

  getOrderById(id:number): Observable<any> {
    return this._ApiService.postReq(`dashboard/orders/show`, {id});
  }

  // products

  getProducts(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/products?page=${page}`, {
      paginate: paginate,
    });
  }

  insertProduct(row: any): Observable<any> {
    return this._ApiService.postReq('dashboard/products/store', row);
  }

  // cateogries
  getCateogries(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/categories?page=${page}`, {
      paginate: paginate,
    });
  }

  insertCateogries(row: any): Observable<any> {
    return this._ApiService.postReq('dashboard/categories/store', row);
  }
  // genders
  getGenders(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/genders?page=${page}`, {
      paginate: paginate,
    });
  }
  insertGenders(row: any): Observable<any> {
    return this._ApiService.postReq('dashboard/genders/store', row);
  }
  // colors
  getColors(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/colors?page=${page}`, {
      paginate: paginate,
    });
  }

  insertColors(row: any): Observable<any> {
    return this._ApiService.postReq('dashboard/colors/store', row);
  }
  // sizes
  getSizes(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/sizes?page=${page}`, {
      paginate: paginate,
    });
  }
  insertSizes(row: any): Observable<any> {
    return this._ApiService.postReq('dashboard/sizes/store', row);
  }
}

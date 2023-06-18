import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { IPagination } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private _ApiService: ApiService) {}

  changeProductAvailability(product_ids: number[]): Observable<{
    message: string;
    status: number;
    data: any;
  }> {
    return this._ApiService.postReq(`dashboard/products/addToUnAvailProducts`, {
      product_ids,
    });
  }

  getProducts(page: number, paginate?: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/products?page=${page}`, {
      paginate: paginate,
    });
  }

  getProductsWithoutPagination(): Observable<any> {
    return this._ApiService.postReq(`dashboard/products/indexV2`, {
      withoutPagination:true
    });
  }

  filterProducts(page: number, filter: any): Observable<any> {
    return this._ApiService.postReq(`dashboard/products?page=${page}`, {active:filter});
  }
}

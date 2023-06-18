import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { IFilterOptions, IPagination, IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  filterOptions: BehaviorSubject<IFilterOptions> = new BehaviorSubject<
    IFilterOptions | any
  >(null);

  constructor(private _ApiService: ApiService) {}

  getProducts(page: number = 1): Observable<{
    message: string;
    status: number;
    data: IPagination;
  }> {
    return this._ApiService.postReq(`dashboard/products?page=${page}`, '');
  }

  getProductsById(id:number[]): Observable<{
    message: string;
    status: number;
    data: any;
  }> {
    return this._ApiService.postReq(`dashboard/products?page=1&paginate=8`, {
      category_ids: id,
    });
  }

  getProductsByCategoryId(category_ids: number): Observable<{
    message: string;
    status: number;
    data: IPagination;
  }> {
    return this._ApiService.postReq('dashboard/products', {
      category_ids: [category_ids],
    });
  }

  getFilterOptions(): Observable<{
    message: string;
    status: number;
    data: IFilterOptions;
  }> {
    return this._ApiService.postReq('dashboard/products/filterOptions', '');
  }

  filterProducts(
    filter: any,
    page: number = 1
  ): Observable<{
    message: string;
    status: number;
    data: IPagination;
  }> {
    // filter.withoutPagination = 'true';
    // filter&&(filter.paginate = '1');
    return this._ApiService.postReq(`dashboard/products?page=${page}`, filter);
  }
}

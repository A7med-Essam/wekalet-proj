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
    return this._ApiService.postReq(`dashboard/products?page=${page}`,'');
  }

  getProductsByCategoryId(category_ids: number): Observable<{
    message: string;
    status: number;
    data: IPagination;
  }> {
    return this._ApiService.postReq('dashboard/products', { category_ids:[category_ids] });
  }

  getFilterOptions(): Observable<{
    message: string;
    status: number;
    data: IFilterOptions;
  }> {
    return this._ApiService.postReq('dashboard/products/filterOptions', '');
  }

  filterProducts(filter: any): Observable<{
    message: string;
    status: number;
    data: IProduct[];
  }> {
    filter.withoutPagination = 'true';
    return this._ApiService.postReq('dashboard/products', filter);
  }
}

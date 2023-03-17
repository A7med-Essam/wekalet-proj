import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { IPagination, IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: BehaviorSubject<IProduct[] | any> = new BehaviorSubject(null);

  constructor(private _ApiService: ApiService) {}

  getProducts(): Observable<{
    message: string;
    status: number;
    data: { data: IProduct[]; pagination: IPagination };
  }> {
    return this._ApiService.postReq('dashboard/products', '');
  }

  getProductsByCategoryId(category_id: number): Observable<{
    message: string;
    status: number;
    data: { data: IProduct[]; pagination: IPagination };
  }> {
    return this._ApiService.postReq('dashboard/products', { category_id });
  }
}

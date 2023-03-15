import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _ApiService:ApiService
  ) { }

  getProducts(): Observable<any> {
    return this._ApiService.postReq('dashboard/products', '');
  }

  getProductsByCategoryId(category_id:number): Observable<any> {
    return this._ApiService.postReq('dashboard/products', {category_id});
  }
}

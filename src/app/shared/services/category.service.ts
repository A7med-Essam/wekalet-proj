import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ICategory, IPagination } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _ApiService: ApiService) {}

  categoryId: BehaviorSubject<number> = new BehaviorSubject(0);
  categories: BehaviorSubject<ICategory|any> = new BehaviorSubject(null);

  getCategories(): Observable<{message:string,status:number,data:{data:ICategory[],pagination:IPagination}}> {
    return this._ApiService.postReq('dashboard/categories', '');
  }
}

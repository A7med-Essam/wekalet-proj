import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _ApiService: ApiService) {}

  categoryId: BehaviorSubject<number> = new BehaviorSubject(0);
  categories: BehaviorSubject<any> = new BehaviorSubject(null);

  getCategories(): Observable<any> {
    return this._ApiService.postReq('dashboard/categories', '');
  }
}

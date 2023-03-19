import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
@Injectable({
providedIn: 'root'
})
export class ContactService {
    constructor(
        private _ApiService: ApiService
      ) {}

      sendMessage(form:any): Observable<any> {
        return this._ApiService.postReq(`sendContactMail`, form);
      }
}
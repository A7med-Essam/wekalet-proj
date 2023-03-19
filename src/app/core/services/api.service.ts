import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/shared/services/local.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Notification: string = 'Notification';
  PleaseLogin: string = 'Please Login';
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private _Router: Router,
    private _MessageService:MessageService,
    private _LocalService: LocalService
  ) {}


  postReq(url: string, body: any, params?: HttpParams): Observable<any> {
    this.ngxService.start();
    return this.http
      .post(environment.BaseUrl + url, body, { params: params })
      .pipe(
        retry(3),
        tap(
          (res:any) => {
            this.ngxService.stop();
            if (res.status != 1) {
              this._MessageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
            }
          },
          (err:any) => {
            this.ngxService.stop();
            this._MessageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
            });
          }
        )
      );
  }

}

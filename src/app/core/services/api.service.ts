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
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/shared/services/local.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Notification: string = 'Notification';
  PleaseLogin: string = 'Please Login';
  constructor(
    private http: HttpClient,
    // private ngxService: NgxUiLoaderService,
    private _Router: Router,
    private _LocalService: LocalService
  ) {
    // if (this._LocalService.getJsonValue('currentLang') == 'ar') {
    //   this.PleaseLogin = 'برجاء تسجيل الدخول';
    //   this.Notification = 'تنبيه';
    // } else {
    //   this.Notification = 'Notification';
    //   this.PleaseLogin = 'Please Login';
    // }
  }

  // getReq(url: string, params?: HttpParams): Observable<any> {
  //   this.ngxService.start();
  //   return this.http.get(environment.BaseUrl + url, { params: params }).pipe(
  //     retry(3),
  //     tap(
  //       (res: any) => {
  //         if (res.status == 1) {
  //           res.message != ''
  //             ? this._ToastrService.success(res.message, this.Notification, {
  //                 timeOut: 3000,
  //               })
  //             : false;
  //         } else if (res.status == 20) {
  //           this._ToastrService.warning(
  //             res.message,
  //             this._LocalService.getJsonValue('currentLang') == 'ar'
  //               ? 'برجاء تسجيل الدخول'
  //               : 'Please Login',
  //             {
  //               timeOut: 3000,
  //             }
  //           );
  //           localStorage.clear();
  //           setTimeout(() => {
  //             this._Router.navigate(['./auth/login']);
  //           }, 1000);
  //         } else {
  //           this._ToastrService.error(res.message, this.Notification, {
  //             timeOut: 3000,
  //           });
  //         }
  //         this.ngxService.stop();
  //       },
  //       (err) => {
  //         if (err.status == 401) {
  //           this._ToastrService.warning(
  //             err.error.error ? err.error.error : err.name,
  //             this.Notification,
  //             {
  //               timeOut: 4000,
  //             }
  //           );
  //           localStorage.clear();
  //           setTimeout(() => {
  //             this._Router.navigate(['./auth/login']);
  //           }, 1000);
  //         } else {
  //           this._ToastrService.error(
  //             err.error.error ? err.error.error : err.name,
  //             this.Notification,
  //             {
  //               timeOut: 4000,
  //             }
  //           );
  //           setTimeout(() => {
  //             this._Router.navigate(['./home']);
  //           }, 1000);
  //         }
  //         this.ngxService.stop();
  //       }
  //     )
  //   );
  // }

  postReq(url: string, body: any, params?: HttpParams): Observable<any> {
    // this.ngxService.start();
    return this.http
      .post(environment.BaseUrl + url, body, { params: params })
      .pipe(
        retry(3),
        tap(
          (res: any) => {
            // this.ngxService.stop();
          },
          (err) => {
            // this.ngxService.stop();
          }
        )
      );
  }

}

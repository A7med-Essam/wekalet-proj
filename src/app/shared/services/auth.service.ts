import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from './local.service';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _Router: Router,
    private _LocalService: LocalService,
    private _ApiService: ApiService
  ) {
    // if (this._LocalService.getJsonValue('userInfo_steet') != null) {
    //   this.currentUser.next(this._LocalService.getJsonValue('userInfo_steet'));
    // }
  }

  // signUp(signUpData: IRegisterData): Observable<IAuthResponse> {
  //   return this._ApiService.postReq('register', signUpData);
  // }

  // signIn(signInData: ILoginData): Observable<IAuthResponse> {
  //   return this._ApiService.postReq('login', signInData);
  // }

  // saveUser(user: any) {
  //   let userData = {
  //     mobile: user.mobile,
  //     name: user.name,
  //     token: user.access_token,
  //     email: user.email,
  //     id: user.id,
  //     image: user.image,
  //   };
  //   this._LocalService.setJsonValue('userInfo_steet', userData);
  //   this.currentUser.next(userData);
  // }

  // logOut() {
  //   this._Router.navigate(['/auth/login']);
  //   this.currentUser.next(null);
  //   this._LocalService.removeItem('userInfo_steet');
  //   const currentLang = this._LocalService.getJsonValue('currentLang');
  //   this._LocalService.clearToken();
  //   this._LocalService.setJsonValue('currentLang', currentLang);
  // }

  // resetPassword_profile(
  //   password: IResetPassword_profile
  // ): Observable<IDefaultResponse> {
  //   return this._ApiService.postReq('resetPassword', password);
  // }

  // sendResetMail(email: string): Observable<IDefaultResponse> {
  //   return this._ApiService.postReq('sendResetMail', { email: email });
  // }

  // resetPassword(newPassword: IResetPassword): Observable<IDefaultResponse> {
  //   return this._ApiService.postReq('getResetMail', newPassword);
  // }
}

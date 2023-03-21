import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  pass = prompt('Please enter password');
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this._AuthService.currentUser.getValue() != null) {
    //   return true;
    // }
    // else{
    // this._Router.navigate(['./auth/login']);
    //   return false;
    // }
    if (this.pass?.toLocaleLowerCase() == '@b0-steet') {
      return true;
    } else {
      this.pass = null;
      this._Router.navigate(['./home']);
      return false;
    }
  }
}

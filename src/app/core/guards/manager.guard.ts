import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private _Router: Router) {}
  pass = prompt('Please enter password');

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.pass?.toLocaleLowerCase() == '1') {
      return true;
    } else {
      this.pass = null;
      this._Router.navigate(['./home']);
      return false;
    }
  }
}

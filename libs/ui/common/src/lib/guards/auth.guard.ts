import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { OninetCookieService } from '../services/oninet-cookie.service';
import { RedirectService } from '../services/redirect.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private cookieService: OninetCookieService,
    private redirectService: RedirectService,
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (!!this.cookieService.getAuthToken()) {
      return true;
    } else {
      window.location.href = this.redirectService.getLoginRedirectUrl();
      return false;
    }
  }
}

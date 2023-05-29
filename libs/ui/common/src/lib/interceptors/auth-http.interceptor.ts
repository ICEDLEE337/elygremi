import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { Config } from '../providers/config.class';
import { OninetCookieService } from '../services/oninet-cookie.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: OninetCookieService,
    private config: Config
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.warn(err);
    if (err.status === 401 || err.status === 403) {
      this.cookieService.deleteSessionTokens();
      window.location.href = this.config.uiUrlAccount;
    }
    return of(EMPTY);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.cookieService.getAuthToken();
    if (token) {
      console.warn('adding auth headerzzzz')
      return next
        .handle(
          req.clone({
            setHeaders: {
              Authorization: token,
              'x-identity-token': this.cookieService.getIdToken(),
            },
          })
        )
        .pipe(catchError((e) => this.handleAuthError(e)));
    }

    return next.handle(req).pipe(catchError((e) => this.handleAuthError(e)));
  }
}

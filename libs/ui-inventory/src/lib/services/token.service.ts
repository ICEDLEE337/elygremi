import { Injectable } from '@angular/core';
import { OninetCookieService, decode, negate } from '@oninet/ui/common';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private authToken$$ = new BehaviorSubject<any | undefined>(
    undefined
  );
  private authToken$ = this.authToken$$.asObservable();
  private idToken$$ = new BehaviorSubject<any | undefined>(
    undefined
  );
  private idToken$ = this.idToken$$.asObservable();
  isAdmin$ = this.authToken$.pipe(map(() => false));
  notAdmin$ = this.isAdmin$.pipe(map(negate));
  id$ = this.authToken$.pipe(map((token) => token?.sub));
  name$ = this.idToken$.pipe(map((token) => token?.name));
  email$ = this.idToken$.pipe(map((token) => token?.email));
  phone$ = this.idToken$.pipe(map((token) => token?.phone_number));

  constructor(private cookieService: OninetCookieService) {}

  async init() {
    const authToken = this.cookieService.getAuthToken();

    if (authToken) {
      this.authToken$$.next(decode(authToken));
    } else {
      this.authToken$$.next(undefined);
    }

    const idToken = this.cookieService.getIdToken();

    if (idToken) {
      this.idToken$$.next(decode(idToken));
    } else {
      this.idToken$$.next(undefined);
    }
  }
}

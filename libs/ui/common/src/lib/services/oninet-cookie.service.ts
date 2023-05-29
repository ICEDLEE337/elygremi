import { Injectable } from '@angular/core';
import { Config } from '../providers/config.class';
import { CookieService } from 'ngx-cookie-service';

const authCookieName = 'oninet_auth';
const emailCookieName = 'oninet_email';
const idCookieName = 'oninet_id';

@Injectable({ providedIn: 'root' })
export class OninetCookieService {
  constructor(private cookieService: CookieService, private config: Config) {}

  getAuthToken() {
    return this.getCookie(authCookieName);
  }

  getIdToken() {
    return this.getCookie(idCookieName);
  }

  setEmail(email: string) {
    this.setCookie(emailCookieName, email);
  }

  getEmail() {
    return this.getCookie(emailCookieName);
  }

  deleteEmail() {
    return this.deleteCookie(emailCookieName);
  }

  setSessionTokens(authToken: string, idToken: string) {
    this.setCookie(authCookieName, authToken);
    this.setCookie(idCookieName, idToken);
  }

  deleteSessionTokens() {
    this.deleteCookie(authCookieName);
    this.deleteCookie(idCookieName);
  }

  private deleteCookie(name: string) {
    this.cookieService.delete(name, '/', this.config.domain);
  }

  private getCookie(name: string) {
    return this.cookieService.get(name);
  }

  private setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; SameSite=Lax; Path=/; Domain=${this.config.domain}`;
  }
}

import { CookieService } from 'ngx-cookie-service';
import { OninetCookieService } from '../services/oninet-cookie.service';
import { Config } from './config.class';

export function cookieServiceFactory(
config: Config
) {
  return new OninetCookieService(new CookieService(document, 'browser'), config);
}

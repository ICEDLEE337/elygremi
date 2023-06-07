import axios from 'axios';
import { OninetCookieService } from '../services/oninet-cookie.service';
import { RedirectService } from '../services/redirect.service';
import { Config } from './config.class';

export function axiosInstanceFactory(
  cookieService: OninetCookieService,
  uiUrlAccount: string
) {

  const instance = axios.create();

  const redirectSvc = new RedirectService({ uiUrlAccount } as Config);

  instance.interceptors.request.use(req => {

    if (!req.headers) {
      req.headers = {};
    }
    req.headers['Authorization'] = cookieService.getAuthToken();
    req.headers['x-identity-token'] = cookieService.getIdToken();

    return req;
  })

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      console.warn({ err, msg: 'axiosInstanceFactory error' })
      if (err?.response.status === 403) {
        // cookieService.deleteSessionTokens();
        // window.location.href = redirectSvc.getLoginRedirectUrl();
      }

      return err;
    }
  );

  return instance;
}

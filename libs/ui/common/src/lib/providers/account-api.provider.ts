import { DefaultApi } from '@oninet/generated/account';
import { axiosInstanceFactory } from './axios-instance.factory';
import { cookieServiceFactory } from './cookie-service.factory';
import { Config } from './config.class';

export function accountApiProvider(
  config: Config
) {
  const cookieService = cookieServiceFactory(config);
  return {
    provide: DefaultApi,
    useFactory: () =>
      new DefaultApi(
        { basePath: config.api } as any,
        config.api,
        axiosInstanceFactory(cookieService, config.uiUrlAccount)
      ),
  };
}

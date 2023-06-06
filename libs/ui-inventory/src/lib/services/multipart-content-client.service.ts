import { Injectable } from '@angular/core';
import { Config, OninetCookieService } from '@oninet/ui/common';
import { axiosInstanceFactory } from 'libs/ui/common/src/lib/providers/axios-instance.factory';


@Injectable({ providedIn: 'root' })
export class MultipartContentClientService {
  constructor(
    private config: Config,
    private cookieService: OninetCookieService
  ) {}

  async postFilesAndData(
    formData: FormData,
    path: string,
    value: Record<any, any> | any[],
    key = '{}',
  ) {
    formData.append(key, JSON.stringify(value));

    return await this.sendFiles(formData, path, true);
  }

  async putFilesAndData(
    formData: FormData,
    path: string,
    value: Record<any, any> | any[],
    key = '{}',
  ) {
    formData.append(key, JSON.stringify(value));

    return await this.sendFiles(formData, path, false);
  }

  async sendFiles(formData: FormData, path: string, post = true) {
    const axios = axiosInstanceFactory(
      this.cookieService,
      this.config.uiUrlAccount
    );
    const response = (
      await axios[post ? 'post' : 'put'](`${this.config.api}/api/${path}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: this.cookieService.getAuthToken(),
          'x-identity-token': this.cookieService.getIdToken(),
        },
      })
    ).data;

    return response;
  }
}

import { AuthGuard, UserId } from '@onivoro/server-aws-auth';
import { S3Service } from '@onivoro/server-aws-s3';
import { configureEnv } from '@oninet/api/configuration';
import axios from 'axios';

import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { ChannelApi } from '@oninet/generated/akeneo';
import { Channel } from 'diagnostics_channel';

////@UseGuards(AuthGuard)
@Controller('akeneo-product')
export class AkeneoProductController {

  constructor(private s3Svc: S3Service) { }

  @Get('/api')
  async get () {
    return (await axios.get(`${configureEnv().AKANEO_HOST}/api/rest/v1`)).data;
  }

  @Get('/')
  async index() {
    try {
      const {
        AKANEO_HOST,
      } = configureEnv();

      const tokenResponse = await getToken();

      const axiosInstance = axiosInstanceFactory(tokenResponse?.access_token, AKANEO_HOST)

      const akeneo: ChannelApi = new ChannelApi(null, AKANEO_HOST, axiosInstance);

      return (await akeneo.getChannels()).data;
    } catch (error: any) {
      throw new BadRequestException(
        `failed to hit akeneo api due to error ${error?.message}`
      );
    }
  }
}

async function getToken() {

  const {
    AKANEO_USERNAME,
    AKANEO_PASSWORD,
    AKANEO_CLIENT_ID,
    AKANEO_CLIENT_SECRET,
    AKANEO_HOST,
  } = configureEnv();
  const body = {
    grant_type: "password",
    username: AKANEO_USERNAME,
    password: AKANEO_PASSWORD
  };

  try {
    const str = encode(`${AKANEO_CLIENT_ID}:${AKANEO_CLIENT_SECRET}`);
    return (await axios.post(`${AKANEO_HOST}/api/oauth/v1/token`,
      body,
      {
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          Authorization: `Basic ${str}`,
        }
      })).data;

  } catch (error) {
    console.log('failed to get token => ', error);
    throw error;
  }
}

function encode (str: string) {
  return Buffer.from(str).toString('base64');
}


export function axiosInstanceFactory(
  accessToken: string,
  baseURL: string,
) {

  const instance = axios.create({baseURL});

  instance.interceptors.request.use(req => {

    if (!req.headers) {
      req.headers = {};
    }
    req.headers['Authorization'] = `Bearer ${accessToken}`;
    req.headers["Content-Type"] = 'application/json';

    return req;
  })

  instance.interceptors.response.use(
    (res) => {
      console.log(res.config?.url);

      return res;
    },
    (err) => {
      console.warn({ err, msg: 'axiosInstanceFactory error' })
      // if (err?.response.status === 403) {
        // cookieService.deleteSessionTokens();
        // window.location.href = redirectSvc.getLoginRedirectUrl();
      // }

      return err;
    }
  );

  return instance;
}


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

  @Get('/')
  async index() {
    try {

      const Authorization = await getToken();

      const options = {
        basePath: configureEnv().AKANEO_HOST,
        Headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
          Authorization
        }
      } as any;

      const akeneo: ChannelApi = new ChannelApi(options);

      return (await akeneo.getChannels()).data;
    } catch (error: any) {
      throw new BadRequestException(
        `failed to hit akeneo api due to error ${error?.message}`
      );
    }
  }
}

async function getToken() {
  try {
    const str = (`${('1_3m3vja8ogl8g8w4s4cksgwgkgg4cwccs0kwow0o4osgwgkowwc')}:${encode('4k8t5gch6yyo8c0c8g4w8s0wcg0g4wsggs0w4o0gs40k0gw8g8')}`);
    return (await axios.post(`${configureEnv().AKANEO_HOST}/api/oauth/v1/token`,
      {
        "grant_type": "password",
        "username": configureEnv().AKANEO_USERNAME,
        "password": configureEnv().AKANEO_PASSWORD
      },
      {
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          "Authorization": `Basic ${str}`,
        }
      })).data;

  } catch (error) {
    console.log('failed to get token => ', error);
  }
}

function encode (str: string) {
  return Buffer.from(str).toString('base64');
}

import { AuthGuard, UserId } from '@onivoro/server-aws-auth';
import { S3Service } from '@onivoro/server-aws-s3';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { configureEnv } from '@oninet/api/configuration';
import { UrlDto } from '@onivoro/server-common';

////@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  bucket = configureEnv().AWS_BUCKET_UPLOADS;

  constructor(private s3Svc: S3Service) {}

  @Get(':key')
  @ApiParam({ type: 'string', name: 'key' })
  @ApiResponse({ type: UrlDto })
  async download(@Param('key') key: string) {
    try {
      const url = await this.s3Svc.getDownloadUrl({ Key: key });

      return { url };
    } catch (error: any) {
      throw new BadRequestException(
        `failed to pre-authorize ${this.bucket} ${key} due to error ${error?.message}`
      );
    }
  }

  @Get('key/:key')
  @ApiParam({ type: 'string', name: 'key' })
  @ApiResponse({ type: UrlDto })
  async downloadByKey(@UserId() id: string, @Param('key') key: string) {
    try {
      const url = await this.s3Svc.getDownloadUrl({ Key: key });

      return { url };
    } catch (error: any) {
      throw new BadRequestException(
        `failed to pre-authorize ${this.bucket} ${key} due to error ${error?.message}`
      );
    }
  }
}

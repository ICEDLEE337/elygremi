import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PasswordReset, PasswordResetService } from '@oninet/api/repository-oninet';
import { EmailDto, PasswordDto } from '@onivoro/server-aws-auth';

@Controller('user/password-reset')
export class UserPasswordResetController {
  constructor(private passwordResetSvc: PasswordResetService) {}

  @Get(':hash')
  @ApiParam({name: 'hash', type: 'string'})
  @ApiResponse({type: PasswordReset})
  get(@Param('hash') hash: string) {
    return this.passwordResetSvc.getByHash(hash);
  }

  @Post()
  @ApiBody({type: EmailDto})
  @ApiResponse({type: PasswordReset})
  async post(@Body() { email }: EmailDto) {
    return await this.passwordResetSvc.startReset(email);
  }

  @Put(':hash')
  @ApiParam({type: 'string', name: 'hash'})
  @ApiBody({type: PasswordDto})
  @ApiResponse({type: PasswordReset})
  async put(@Param('hash') hash: string, @Body() body: PasswordDto) {
    return await this.passwordResetSvc.completeReset(hash, body);
  }
}

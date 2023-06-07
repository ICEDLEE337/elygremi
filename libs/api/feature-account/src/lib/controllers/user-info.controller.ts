import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessToken, AccessTokenDto, AuthGuard, IAccessToken, UserId } from '@onivoro/server-aws-auth';
import { ApiResponse } from '@nestjs/swagger';
import { User, UserService } from '@oninet/api/repository-oninet';

////@UseGuards(AuthGuard)
@Controller('user-info')
export class UserInfoController {
  constructor(
    private userAccessInfoSvc: UserService,
  ) { }

  @Get()
  @ApiResponse({ type: User })
  async get(@UserId() userId: string) {
    return await this.userAccessInfoSvc.getUserById(userId);
  }

  @Get('access-token')
  @ApiResponse({ type: AccessTokenDto })
  getAccessToken(@AccessToken() accessToken: IAccessToken) {
    return accessToken;
  }
}

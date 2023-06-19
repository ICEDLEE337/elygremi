import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  AccessToken,
  AccessTokenDto,
  UserId,
  IAccessToken,
} from '@onivoro/server-aws-auth';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  User,
  UserService,
} from '@oninet/api/repository-oninet';

// @UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private userRepo: UserService
  ) {}

  @Get('access-token')
  @ApiResponse({ type: AccessTokenDto })
  getAccessToken(@AccessToken() accessToken: IAccessToken) {
    return accessToken;
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ type: User })
  async legacyGet(@UserId() userId: string, @Param('id') _legacy_id: string) {
    return await this.userRepo.getUserById(userId);
  }

  @Get()
  @ApiResponse({ type: User })
  async get(@UserId() userId: string) {
    const user = await this.userRepo.getUserById(userId);
    return user;
  }

  @Put()
  @ApiBody({ type: User })
  @ApiResponse({ type: User })
  async put(@Body() user: User, @UserId() id: string) {
    await this.userRepo.updateUser(id, {
      ...user,
      id,
    });

    return await this.userRepo.getUserById(id);
  }
}

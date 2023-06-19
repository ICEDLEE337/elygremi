import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

import { AuthGuard, UserId } from '@onivoro/server-aws-auth';

import {
  User,
  UserService,
} from '@oninet/api/repository-oninet';

import { DirectUserService } from '../services/direct-user.service';
import { AdminUserService } from '../services/admin-user.service';
import { IsSysAdmin } from '../decorators/is-sys-admin.decorator';
import { OrgId } from '../decorators/org-id.decorator';

const UsersResponse = { type: User, isArray: true };
const UserIdParam = { type: 'string', name: 'userId' };
const UserPayload = { type: User };

@UseGuards(AuthGuard)
@Controller('admin/user')
export class AdminUserController {
  constructor(
    public userRepo: UserService,
    private adminSvc: AdminUserService,
    private directUserSvc: DirectUserService
  ) {}

  @Get()
  @ApiResponse(UsersResponse)
  async index(@OrgId() orgId: string, @IsSysAdmin() isSysAdmin: boolean) {
    return isSysAdmin
      ? await this.userRepo.getAllUsers()
      : await this.userRepo.getUsersByOrgId(orgId);
  }

  @Get(':userId')
  @ApiParam(UserIdParam)
  @ApiResponse(UserPayload)
  async get(
    @Param('userId') id: string,
    @OrgId() orgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    const user = await this.userRepo.getUserById(id);

    if (isSysAdmin || user.orgId === orgId) {
      return user;
    }

    throwErrorForNoAccess(orgId, id, user.orgId);
  }

  @Put(':userId')
  @ApiParam(UserIdParam)
  @ApiBody(UserPayload)
  @ApiResponse(UsersResponse)
  async put(
    @Param('userId') id: string,
    @Body() user: User,
    @OrgId() orgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    if (isSysAdmin || user.orgId === orgId) {
      await this.userRepo.updateUser(id, user);

      return await this.userRepo.getUsersByOrgId(orgId);
    }

    throwErrorForNoAccess(orgId, id, user.orgId);
  }

  @Post()
  @ApiBody(UserPayload)
  @ApiResponse(UserPayload)
  async post(
    @Body() user: User,
    @OrgId() orgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    if (isSysAdmin || user.orgId === orgId) {
      return await this.directUserSvc.directlyCreateUser(user);
    }
  }

  @Delete(':userId')
  @ApiParam(UserIdParam)
  @ApiResponse(UsersResponse)
  async delete(
    @Param('userId') id: string,
    @OrgId() orgId: string,
    @UserId() userId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    if (id === userId) {
      throw new BadRequestException(
        'Deleting your own account is not permitted'
      );
    }

    const user = await this.userRepo.getUserById(id);

    if (isSysAdmin || user.orgId === orgId) {
      return await this.adminSvc.deleteUser(id);
    }

    throwErrorForNoAccess(orgId, id, user.orgId);
  }
}

function throwErrorForNoAccess(
  orgId: string,
  userId: string,
  externalOrgId: string
) {
  throw new BadRequestException(
    `You can only access users within your own organization ${orgId} but user ${userId} belongs to org ${externalOrgId}`
  );
}

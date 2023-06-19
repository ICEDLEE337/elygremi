import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '@onivoro/server-aws-auth';

import { Invitation, InvitationRepository } from '@oninet/api/repository-oninet';

import { IsSysAdmin } from '../decorators/is-sys-admin.decorator';
import { OrgId } from '../decorators/org-id.decorator';
import { UserInvitationService } from './user-invitation.service';

@UseGuards(AuthGuard)
@Controller('admin/invitation')
export class AdminInvitationController {
  constructor(
    public invitationRepo: InvitationRepository,
    private invitationSvc: UserInvitationService
  ) {}

  @Get()
  @ApiResponse({ type: Invitation, isArray: true })
  async index(@OrgId() orgId: string, @IsSysAdmin() isSysAdmin: boolean) {
    return await this.invitationRepo.getInvitationsByOrgId(
      isSysAdmin ? undefined : orgId
    );
  }

  @Get(':email')
  @ApiParam({ type: 'string', name: 'email' })
  @ApiResponse({ type: Invitation })
  async get(
    @Param('email') email: string,
    @OrgId() orgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return isSysAdmin
      ? await this.invitationRepo.getInvitation(email)
      : await this.invitationRepo.getInvitation(email, orgId);
  }

  @Post()
  @ApiBody({ type: Invitation })
  @ApiResponse({ type: Invitation, isArray: true })
  async post(
    @Body() invitation: Invitation,
    @OrgId() orgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    await this.invitationSvc.createInvitationFromAdmin(invitation);

    return await this.invitationRepo.getInvitationsByOrgId(
      isSysAdmin ? undefined : orgId
    );
  }

  @Delete(':invitationId')
  @ApiParam({ type: 'string', name: 'invitationId' })
  async delete(
    @Param('invitationId') email: string,
    @OrgId() orgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return isSysAdmin
      ? await this.invitationRepo.delete({ email })
      : await this.invitationRepo.delete({ email, orgId });
  }
}

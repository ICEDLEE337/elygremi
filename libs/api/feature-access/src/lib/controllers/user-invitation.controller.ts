import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  ContactInfoDto,
  EmailDto,
  PasswordDto,
} from '@onivoro/server-aws-auth';
import { UserInvitationService } from '../services/user-invitation.service';
import { Invitation } from '@oninet/api/repository-oninet';

const logoUrl = '';

@Controller('user/invitation')
export class UserInvitationController {
  constructor(private invitationSvc: UserInvitationService) {}

  @Get(':hash')
  @ApiParam({ name: 'hash', type: 'string' })
  @ApiResponse({ type: Invitation })
  get(@Param('hash') hash: string) {
    return this.invitationSvc.validateEmail(hash);
  }

  @Post('linkless')
  @ApiBody({ type: ContactInfoDto })
  @ApiResponse({ type: Invitation })
  postLinkless(@Body() contactInfo: ContactInfoDto) {
    return this.invitationSvc.inviteLinklessly(contactInfo);
  }

  @Post('resend')
  @ApiBody({ type: EmailDto })
  resendEmail(@Body() { email }: EmailDto) {
    return this.invitationSvc.resendInvite(email);
  }

  @Post()
  @ApiResponse({ type: Invitation })
  @ApiBody({ type: EmailDto })
  post(@Body() { email }: EmailDto) {
    return this.invitationSvc.invite(email, logoUrl);
  }

  @Put(':hash/password')
  @ApiParam({ name: 'hash', type: 'string' })
  @ApiBody({ type: PasswordDto })
  @ApiResponse({ type: Invitation })
  putPassword(@Param('hash') hash: string, @Body() body: PasswordDto) {
    return this.invitationSvc.savePasswordAndCreateCognitoUser(hash, body);
  }
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Invitation } from '@oninet/api/repository-oninet';
import { CodeDto, EmailDto, PasswordDto, PhoneDto, PhoneValidDto } from '@onivoro/server-aws-auth';
import { UserInvitationService } from '../services/user-invitation.service';

@Controller('user/invitation')
export class UserInvitationController {
  constructor(private invitationSvc: UserInvitationService) {}

  @Get(':hash')
  @ApiParam({name: 'hash', type: 'string'})
  @ApiResponse({type: Invitation})
  get(@Param('hash') hash: string) {
    return this.invitationSvc.validateEmail(hash);
  }

  @Post()
  @ApiResponse({type: Invitation})
  @ApiBody({type: EmailDto})
  post(@Body() { email }: EmailDto) {
    return this.invitationSvc.invite(email);
  }

  @Put(':hash/password')
  @ApiParam({name: 'hash', type: 'string'})
  @ApiBody({type: PasswordDto})
  @ApiResponse({type: Invitation})
  putPassword(@Param('hash') hash: string, @Body() body: PasswordDto) {
    return this.invitationSvc.savePasswordAndCreateCognitoUser(hash, body);
  }
}

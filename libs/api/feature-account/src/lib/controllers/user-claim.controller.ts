import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserClaimDto } from '../dtos/user-claim.dto';
import { UserIdDto } from '../dtos/user-id.dto';
import { UserClaimService } from '../services/user-claim.service';

@Controller('user-claim')
export class UserClaimController {
  constructor(
    private userClaimSvc: UserClaimService,
  ) { }

  @Post()
  @ApiBody({ type: UserIdDto })
  @ApiResponse({ type: UserClaimDto })
  async post(@Body() {userId}: UserIdDto) {
    return await this.userClaimSvc.getClaims(userId)
  }
}

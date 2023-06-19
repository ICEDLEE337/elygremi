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

import { SuccessDto } from '@onivoro/server-common';

import { Org, OrgService } from '@oninet/api/repository-oninet';

import { SystemService } from '../services/system.service';
import { IsSysAdmin } from '../decorators/is-sys-admin.decorator';
import { OrgId } from '../decorators/org-id.decorator';
import { AdminGuard } from '../guards/admin.guard';

// @UseGuards(AdminGuard)
@Controller('admin/org')
export class AdminOrgController {
  constructor(private orgSvc: OrgService, private systemSvc: SystemService) {}

  @Get()
  @ApiResponse({ type: Org, isArray: true })
  async index(@OrgId() userOrgId: string, @IsSysAdmin() isSysAdmin: boolean) {
    return isSysAdmin
      ? await this.orgSvc.getOrgs()
      : [await this.orgSvc.getOrgById(userOrgId)];
  }

  @Get(':orgId')
  @ApiParam({ type: 'string', name: 'orgId' })
  @ApiResponse({ type: Org })
  async get(
    @Param('orgId') id: string,
    @OrgId() userOrgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return await execIfUserCanAccessOrg(isSysAdmin, userOrgId, id, () =>
      this.orgSvc.getOrgById(id)
    );
  }

  @Put(':orgId')
  @ApiParam({ type: 'string', name: 'orgId' })
  @ApiBody({ type: Org })
  @ApiResponse({ type: Org })
  async put(
    @Param('orgId') id: string,
    @Body() org: Org,
    @OrgId() userOrgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return await execIfUserCanAccessOrg(isSysAdmin, userOrgId, id, () =>
      this.orgSvc.update(id, org)
    );
  }

  @Put(':orgId/deactivate')
  @ApiParam({ type: 'string', name: 'orgId' })
  @ApiResponse({ type: Org })
  async deactivate(
    @Param('orgId') id: string,
    @OrgId() userOrgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return await execIfUserCanAccessOrg(isSysAdmin, userOrgId, id, () =>
      this.orgSvc.deactivate(id)
    );
  }

  @Post()
  @ApiBody({ type: Org })
  @ApiResponse({ type: Org })
  async post(
    @Body() org: Org,
    @OrgId() userOrgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return await execIfUserCanAccessOrg(isSysAdmin, userOrgId, undefined, () =>
      this.orgSvc.createOrg(org)
    );
  }

  @Delete(':orgId')
  @ApiParam({ type: 'string', name: 'orgId' })
  @ApiResponse({ type: SuccessDto })
  async delete(
    @Param('orgId') orgId: string,
    @OrgId() userOrgId: string,
    @IsSysAdmin() isSysAdmin: boolean
  ) {
    return await execIfUserCanAccessOrg(
      isSysAdmin,
      userOrgId,
      orgId,
      async () => ({ success: await this.systemSvc.deleteOrg(orgId) })
    );
  }
}

async function execIfUserCanAccessOrg(
  isSysAdmin: boolean,
  userOrgId: string,
  subjectOrgId: string | undefined,
  fn: () => Promise<any>
) {
  const thereIsOrgIdAndItMatchesUserOrgId =
    subjectOrgId && subjectOrgId === userOrgId;
  if (isSysAdmin || thereIsOrgIdAndItMatchesUserOrgId) {
    return await fn();
  }

  throw new BadRequestException(
    `Only system admins have access to orgs they don't belong to. Your org is ${userOrgId}`
  );
}

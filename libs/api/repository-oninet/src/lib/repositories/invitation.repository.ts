import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '@onivoro/server-typeorm-postgres';
import { EntityManager } from 'typeorm';
import { Invitation } from '../entities/invitation.entity';

@Injectable()
export class InvitationRepository extends TypeOrmRepository<Invitation> {
  constructor(public entityManager: EntityManager) {
    super(Invitation, entityManager);
  }

  async getInvitation(email: string, orgId?: string) {
    return orgId
      ? await this.getOne({ where: { email, orgId } })
      : await this.getOne({ where: { email } });
  }

  async getInvitationsByOrgId(orgId?: string) {
    return orgId
      ? await this.getMany({ where: { orgId } })
      : await this.getMany({});
  }
}

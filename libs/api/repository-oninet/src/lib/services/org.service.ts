import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, In } from 'typeorm';

import { OrgRepository } from '../repositories/org.repository';
import { Org } from '../entities/org.entity';

@Injectable()
export class OrgService {
  constructor(private orgRepo: OrgRepository) {}

  async update(id: string, org: Partial<Org>) {
    await this.orgRepo.patch({ id }, {
      ...org,
    } as any);
    return await this.getOrgById(id);
  }

  async deactivate(id: string) {
    await this.update(id, {
      active: true,
    });
  }

  async getOrgById(id: string): Promise<Org> {
    const where: FindOptionsWhere<Org> = { id };
    const org = await this.orgRepo.getOne({
      where,
      relations: {
        users: true,
        invitations: true,
      },
    });
    return this.transformOrg(org) as Org;
  }

  async getOrgs(active = true): Promise<Org[]> {
    const where: FindOptionsWhere<Org> = { active };
    const orgs = await this.orgRepo.getMany({
      where,
      order: { name: 'asc' as any },
    });
    return orgs.map((o) => this.transformOrg(o));
  }

  async createOrg(org: Partial<Org>) {
    return await this.orgRepo.createOrg(org);
  }

  transformOrg(org: Org, active = true) {
    if (!org) {
      return;
    }

    return org;
  }
}

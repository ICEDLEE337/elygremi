import { TypeOrmRepository } from '@onivoro/server-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Org } from '../entities/org.entity';
import { v4 } from 'uuid';

@Injectable()
export class OrgRepository extends TypeOrmRepository<Org> {
  constructor(public entityManager: EntityManager) {
    super(Org, entityManager);
  }

  async createOrg(org: Partial<Org>) {
    const id = org.id || v4();
    const name = org.name || id;

    return await this.postOne({
      ...org,
      id,
      name,
      isAdmin: false
    } as any);
  }
}

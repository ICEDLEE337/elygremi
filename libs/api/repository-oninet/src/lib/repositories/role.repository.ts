import { TypeOrmRepository } from '@onivoro/server-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends TypeOrmRepository<Role> {
  constructor(public entityManager: EntityManager) {
    super(Role, entityManager);
  }
}

import { TypeOrmRepository } from '@onivoro/server-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordResetRepository extends TypeOrmRepository<PasswordReset> {
  constructor(public entityManager: EntityManager) {
    super(PasswordReset, entityManager);
  }
}

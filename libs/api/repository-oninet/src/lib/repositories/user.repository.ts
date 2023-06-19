import { TypeOrmRepository } from '@onivoro/server-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
  constructor(public entityManager: EntityManager) {
    super(User, entityManager);
  }

  async createUser(user: Partial<User>) {
    return await this.postOne({
      ...user,
      active: true,
      data: {},
    } as User);
  }

}

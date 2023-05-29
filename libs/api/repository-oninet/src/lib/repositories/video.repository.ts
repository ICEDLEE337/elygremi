import { TypeOrmRepository } from '@onivoro/server-typeorm-postgres';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Video } from '../entities/video.entity';

@Injectable()
export class VideoRepository extends TypeOrmRepository<Video> {
  constructor(public entityManager: EntityManager) {
    super(Video, entityManager);
  }
}

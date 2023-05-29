import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Video } from './video.entity';

@Entity({name: 'user'})
export class User {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean' })
  active: boolean;

  @ApiProperty()
  @Column({ nullable: false })
  email: string;

  @ApiPropertyOptional()
  @Column({ type: 'jsonb', nullable: false })
  data: any;

  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(
    () => Role,
    (role) => role.users, {
    cascade: true,
  }
  )
  roles: Role[];

  @ManyToMany(
    () => Video,
    (_) => _.users, {
    cascade: true,
  }
  )
  videos: Video[];
}

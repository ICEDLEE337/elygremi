import { Table } from '@onivoro/server-typeorm-postgres';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Invitation } from './invitation.entity';

@Table(Org)
export class Org {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean' })
  isAdmin: boolean;

  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  domain?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  akeneoApiId?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  akeneoApiKey?: string;

  @ApiProperty()
  @Column({ nullable: true })
  apiId: string;

  @ApiProperty()
  @Column({ nullable: true })
  apiKey: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  logoUrl?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  phone?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  contactName?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  street?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  city?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  state?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  zip?: string;

  @ApiPropertyOptional({ type: () => Invitation, isArray: true })
  @OneToMany(() => Invitation, (i) => i.org, { onDelete: 'CASCADE' })
  invitations: Invitation[];

  @ApiPropertyOptional({ type: () => User, isArray: true })
  @OneToMany(() => User, (u) => u.org, { onDelete: 'CASCADE' })
  users: User[];

  @ApiPropertyOptional()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}

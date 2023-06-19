import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Org } from './org.entity';

@Entity({name: 'invitation'})
export class Invitation {
  @ApiProperty()
  @PrimaryColumn({ nullable: false })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
  hash: string;

  @ApiPropertyOptional()
  @Column({ nullable: false })
  code?: string;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  emailValid: boolean;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  isAdmin: boolean;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  orgId?: string;

  @ApiPropertyOptional({ type: () => Org })
  @ManyToOne(() => Org, (o) => o.id)
  @JoinColumn()
  org: Org;

  @ApiPropertyOptional()
  @Column({nullable: true})
  userId?: string;

  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn()
  updatedAt: Date;
}

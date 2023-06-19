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

@Entity({name: 'user'})
export class User {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean' })
  active: boolean;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean' })
  isAdmin: boolean;

  @ApiProperty()
  @Column({ nullable: false })
  email: string;

  @ApiPropertyOptional()
  @Column({ type: 'jsonb', nullable: false })
  data: any;

  @ApiProperty()
  @Column()
  orgId: string;

  @ApiProperty({ type: () => Org })
  @ManyToOne(() => Org, (o) => o.id)
  @JoinColumn()
  org: Org;

  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn()
  updatedAt: Date;

}

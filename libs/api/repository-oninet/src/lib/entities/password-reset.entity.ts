import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'password_reset'})
export class PasswordReset {

  @ApiProperty()
  @PrimaryColumn({ nullable: false })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
  hash: string;

  @ApiPropertyOptional({ type: 'boolean' })
  @Column({ type: 'boolean' })
  emailValid: boolean;

  @ApiPropertyOptional()
  @Column()
  userId?: string;

  @ApiPropertyOptional()
  @CreateDateColumn()
  createdAt: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn()
  updatedAt: Date;
}

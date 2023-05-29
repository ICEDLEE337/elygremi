import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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

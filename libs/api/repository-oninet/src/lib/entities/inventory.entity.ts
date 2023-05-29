import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({name: 'inventory'})
export class Inventory {
  @ApiProperty()
  @PrimaryColumn({ nullable: false })
  id: string

  @ApiPropertyOptional()
  @Column({ nullable: true })
  azVehicleId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  azVehicleMakeId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  azVehicleModelId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  vehicleModelName: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  azVehicleEngineId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  azVehicleEngineName: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  vehicleDisplayName: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  vehicleMakeName: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  azVehicleModelName: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  vehicleYear: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  userId: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  s3Key: string;

  @ApiPropertyOptional()
  s3Url: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (o) => o.id)
  @JoinColumn()
  user: User;
}

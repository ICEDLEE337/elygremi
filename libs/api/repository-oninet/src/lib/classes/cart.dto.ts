import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  facilityCount: number;

  @ApiProperty()
  products: string[];

  @ApiProperty()
  promo: string;
}

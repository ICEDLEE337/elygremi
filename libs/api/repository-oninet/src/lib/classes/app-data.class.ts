import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuanityConfig } from './quantity-config.class';

export class AppData {
  @ApiPropertyOptional()
  roleSeedData?: any;

  @ApiProperty()
  quantityConfig: QuanityConfig;

  @ApiPropertyOptional()
  canBePurchased?: boolean;
}

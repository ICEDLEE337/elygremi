import { ApiProperty } from '@nestjs/swagger';
import { Inventory } from '@oninet/api/repository-oninet';

export class InventorySearchDto {
  @ApiProperty({ type: Inventory, isArray: true }) data: Inventory[];
  @ApiProperty() pagingKey: number;
  @ApiProperty() total: number;
}
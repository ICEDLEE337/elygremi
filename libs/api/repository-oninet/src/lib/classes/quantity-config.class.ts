import { ApiProperty } from '@nestjs/swagger';

export class QuanityConfig {
  @ApiProperty()
  maxFacs: number;
  @ApiProperty()
  maxUsers: number;
  @ApiProperty()
  maxAdmins: number;
}

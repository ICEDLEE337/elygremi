import { User } from '@oninet/api/repository-oninet';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationSignupDto {
  @ApiProperty() email: string;
  @ApiProperty({ type: 'boolean' }) isAnon: boolean;
}

import { ApiProperty } from "@nestjs/swagger";

export class UserClaimDto {
    @ApiProperty() roles: string[];
}

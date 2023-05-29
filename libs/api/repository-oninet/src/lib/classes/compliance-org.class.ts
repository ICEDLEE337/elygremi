import { ApiPropertyOptional } from "@nestjs/swagger";

export class ComplianceOrg {
    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    phone?: string;

    @ApiPropertyOptional()
    codeOfConductUrl?: string;

    @ApiPropertyOptional()
    logoUrl?: string;
}
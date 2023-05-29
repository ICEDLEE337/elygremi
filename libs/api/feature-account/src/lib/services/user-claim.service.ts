import { UserService } from "@oninet/api/repository-oninet";
import { Injectable } from "@nestjs/common";
import { UserClaimDto } from "../dtos/user-claim.dto";

@Injectable()
export class UserClaimService {
    constructor(private userSvc: UserService) { }

    async getClaims(userId: string): Promise<UserClaimDto> {
        const { roles } = await this.userSvc.getUserById(userId);

        return {roles: roles.map(r => r.name) };
    }
}

import { Injectable } from "@nestjs/common";
import { FindOptionsWhere } from "typeorm";
import { Invitation } from "../entities/invitation.entity";
import { InvitationRepository } from "../repositories/invitation.repository";

const order = { createdAt: 'asc' as any };

@Injectable()
export class InvitationService {
    constructor(private invitationRepo: InvitationRepository,
    ) { }

    getAllInvitations() {
        return this.invitationRepo.getMany({ order });
    }

    async getInvitationById(email: string): Promise<Invitation> {
        const where: FindOptionsWhere<Invitation> = { email };
        const invitation = await this.invitationRepo.getOne({ where });

        return invitation;
    }
}

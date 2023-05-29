import { Injectable } from "@nestjs/common";
import { PasswordDto } from "@onivoro/server-aws-auth";
import { FindOptionsWhere, In } from "typeorm";
import { PasswordReset } from "../entities/password-reset.entity";
import { PasswordResetRepository } from "../repositories/password-reset.repository";

const order = { createdAt: 'asc' as any };

@Injectable()
export class PasswordResetService {
    completeReset(hash: string, body: PasswordDto) {
      throw new Error('Method not implemented.');
    }
    startReset(email: string) {
      throw new Error('Method not implemented.');
    }
    getByHash(hash: string) {
      throw new Error('Method not implemented.');
    }
    constructor(private passwordResetRepo: PasswordResetRepository,
    ) { }

    getAllPasswordResets() {
        return this.passwordResetRepo.getMany({ order });
    }

    async getPasswordResetById(email: string): Promise<PasswordReset> {
        const where: FindOptionsWhere<PasswordReset> = { email };
        const passwordReset = await this.passwordResetRepo.getOne({ where });

        return passwordReset;
    }
}

import { Injectable } from "@nestjs/common";
import { FindOptionsWhere, In } from "typeorm";
import { Role } from "../entities/role.entity";
import { RoleRepository } from "../repositories/role.repository";

const order = { name: 'asc' as any };

@Injectable()
export class RoleService {
    constructor(private roleRepo: RoleRepository,
    ) { }

    getAllRoles() {
        return this.roleRepo.getMany({ order });
    }

    async getRoleById(id: string): Promise<Role> {
        const where: FindOptionsWhere<Role> = { id };
        const role = await this.roleRepo.getOne({ where });

        return role;
    }
}

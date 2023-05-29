import { Injectable } from "@nestjs/common";
import { FindOptionsWhere, In } from "typeorm";
import { User } from "../entities/user.entity";
import { InvitationRepository } from "../repositories/invitation.repository";
import { UserRepository } from "../repositories/user.repository";

const order = { email: 'asc' as any };
const relations = { roles: true };

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository,
        private invitationRepo: InvitationRepository,
    ) { }

    async deleteUserGraph(userId: string) {
        await this.invitationRepo.delete({ userId })
        return await this.userRepo.delete({id: userId});
    }

    getAllUsers() {
        return this.userRepo.getMany({ order });
    }

    async updateUser(id: string, update: Partial<User>) {
        return this.userRepo.patch({ id }, update);
    }

    async updateUsers(criteria: FindOptionsWhere<User>, update: Partial<User>) {
        return this.userRepo.patch(criteria, update);
    }

    async getUserById(id: string): Promise<User> {
        const where: FindOptionsWhere<User> = { id };
        const user = await this.userRepo.getOne({ where, relations });

        return this.transformUser(user);
    }

    async getUserByEmail(email: string): Promise<User> {
        const where: FindOptionsWhere<User> = { email };
        const user = await this.userRepo.getOne({ where, relations });

        return this.transformUser(user);
    }

    async getUsersByIds(ids: string[]): Promise<User[]> {
        const where: FindOptionsWhere<User> = { id: In(ids) };
        const users = await this.userRepo.getMany({ where, relations });

        return users.map(user => this.transformUser(user));
    }

    private transformUser(user: User) {
        return user;
    }

    async createUser(user: Partial<User>) {
        return await this.userRepo.postOne({
            ...user,
            active: true,
            data: {},
        } as User);
    }
}

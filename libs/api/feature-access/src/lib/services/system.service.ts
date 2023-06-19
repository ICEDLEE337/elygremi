import { Injectable } from '@nestjs/common';
import {
  InvitationRepository,
  OrgRepository,
  UserRepository,
} from '@oninet/api/repository-oninet';
import { DataSource, In } from 'typeorm';
import { AdminCognitoService } from '@onivoro/server-aws-auth';

@Injectable()
export class SystemService {
  constructor(
    private dataSource: DataSource,
    private cognitoSvc: AdminCognitoService
  ) {}

  async deleteOrg(orgId: string) {
    try {
      await this.dataSource.transaction(async (entityManager) => {
        const userRepo = new UserRepository(entityManager);
        const usersToDelete = await userRepo.getMany({ where: { orgId } });
        const invitationRepo = new InvitationRepository(entityManager);
        const orgRepo = new OrgRepository(entityManager);

        if (usersToDelete?.length) {
          await Promise.all(
            usersToDelete.map(async (u) => {
              const userId = u.id;

              if (userId) {
                await invitationRepo.delete({ userId });
                return await userRepo.delete({ id: userId });
              }
            })
          );
        }

        await orgRepo.delete({ id: orgId });

        if (usersToDelete?.length) {
          await Promise.all(
            usersToDelete.map(async (u) => {
              const userId = u.id;

              if (userId) {
                await this.cognitoSvc.deleteAdminUser(userId);
              }
            })
          );
        }
      });

      return true;
    } catch (error: any) {
      console.log({ error });
      return false;
    }
  }
}

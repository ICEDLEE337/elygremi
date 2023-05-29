import { Injectable } from '@nestjs/common';
import { UserService } from '@oninet/api/repository-oninet';
import { AdminCognitoService } from '@onivoro/server-aws-auth';

@Injectable()
export class AdminUserService {

  constructor(
    private userRepo: UserService,
    private cognitoSvc: AdminCognitoService,
  ) { }

  async deleteUser (userId: string) {
    try {
      await this.cognitoSvc.deleteAdminUser(userId);
    } catch(error) {
      console.error({error, msg: `failed to delete cognito user ${userId}`})
    }

    try {
      await this.userRepo.deleteUserGraph(userId);

      return true;
    } catch (error) {
      console.error({error, msg: `failed to delete postgres user ${userId}`})

      return false;
    }
  }
}

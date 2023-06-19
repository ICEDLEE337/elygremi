import { Injectable } from '@nestjs/common';
import {
  User,
  UserRepository,
} from '@oninet/api/repository-oninet';
import {
  AdminCognitoService,
} from '@onivoro/server-aws-auth';
import { DataSource, In } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { EmailService } from '@onivoro/server-aws-ses';
import { html, pre, p } from '@onivoro/server-html';

@Injectable()
export class DirectUserService {
  constructor(
    private dataSource: DataSource,
    private cognitoSvc: AdminCognitoService,
    private emailSvc: EmailService
  ) {}

  async directlyCreateUser(user: User): Promise<User> {
    try {
      return await this.dataSource.transaction(async (entityManager) => {
        const userRepo = new UserRepository(entityManager);
        const uuid = randomUUID();
        const pw = `E0-${uuid.replace(/-/g, '')}!`;
        const { email } = user;
        const userId = await this.cognitoSvc.adminCreateUser(email, pw, {
          email,
          email_verified: 'true',
        });

        try {
          let orgId: string;
          let isAdmin = user.isAdmin;
          let facs: string[];

          orgId = user.orgId;

          const {
            email,
          } = user;

          const userToSave: User = {
            email,
            active: true,
            orgId,
            id: userId,
            isAdmin,
            data: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          } as User;

          const newlyCreatedUser = await userRepo.createUser(userToSave);

          this.emailSvc.sendEmail(
            user.email,
            'ELYGREMI Account Created',
            html(
              'ELYGREMI Account Created',
              'Here are your account details',
              [
                p(['Welcome to ELYGREMI!']),
                p([
                  'Your username is the email address to which this email has been sent and your password is:',
                ]),
                pre([pw], 'focused mw-440'),
              ],
            ),
            'Your account information'
          );

          return { ...user, ...newlyCreatedUser, userId, orgId, data: { pw } };
        } catch (error: any) {
          console.error(error);

          if (userId) {
            try {
              console.log(
                `deleting cognito user ${userId} because something went wrong while saving user in postgres`
              );
              await this.cognitoSvc.deleteAdminUser(userId);
            } catch (error) {
              console.log(
                `failure encountered deleting cognito user ${userId}`
              );
            }
          }
        }
      });
    } catch (error: any) {
      console.log({ error });
    }
  }
}

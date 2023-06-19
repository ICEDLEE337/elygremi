import { EmailService } from '@onivoro/server-aws-ses';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { html, loginButton, p, pre } from '@onivoro/server-html';

import bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import { v4 } from 'uuid';
import {
  AdminCognitoService,
  ContactInfoDto,
  PasswordDto,
} from '@onivoro/server-aws-auth';
import { DataSource, In } from 'typeorm';
import { Invitation, InvitationRepository, OrgRepository, User, UserRepository } from '@oninet/api/repository-oninet';
import { configureEnv } from '@oninet/api/configuration';

const saltRounds = 10;

const logoUrl = '';

@Injectable()
export class UserInvitationService {
  constructor(
    private emailSvc: EmailService,
    private invitationRepo: InvitationRepository,
    private adminCreateUserSvc: AdminCognitoService,
    private dataSource: DataSource
  ) {}

  async savePasswordAndCreateCognitoUser(
    hash: string,
    { password, confirm }: PasswordDto
  ) {
    return this.dataSource.transaction(async (entityManager) => {
      const invitationRepo = new InvitationRepository(entityManager);
      const orgRepo = new OrgRepository(entityManager);
      const userRepo = new UserRepository(entityManager);

      const invitation = await invitationRepo.getOne({ where: { hash } });

      if (!invitation) {
        throw new BadRequestException(`no invitation found for hash ${hash}`);
      }

      if (password !== confirm) {
        throw new BadRequestException('password and confirm must match');
      }

      const { email } = invitation;
      const userId = await this.adminCreateUserSvc.adminCreateUser(
        email,
        password,
        {
          email,
          email_verified: 'true',
        }
      );

      try {
        let orgId: string;
        let isAdmin = invitation.isAdmin;

        if (invitation.orgId) {
          orgId = invitation.orgId;
        } else {
          isAdmin = true; // ignore what invitation says when there's no orgId in case isAdmin isn't properly set in the invitation
          orgId = v4();
          await orgRepo.createOrg({
            id: orgId,
            name: orgId,
          });
        }

        const {
          email,
        } = invitation;

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

        await userRepo.createUser(userToSave);

        await invitationRepo.delete({ email: invitation.email });

        return { ...invitation, userId, orgId };
      } catch (error: any) {
        console.error(error);

        if (userId) {
          try {
            console.log(
              `deleting cognito user ${userId} because something went wrong while saving user in postgres`
            );
            await this.adminCreateUserSvc.deleteAdminUser(userId);
          } catch (error) {
            console.log(`failure encountered deleting cognito user ${userId}`);
          }
        }
      }
    });
  }

  async validateEmail(hash: string) {
    const invitation = await this.invitationRepo.getOne({ where: { hash } });

    if (!invitation) {
      throw new BadRequestException();
    }

    await this.invitationRepo.patch(
      { email: invitation.email },
      { emailValid: true }
    );

    return invitation;
  }

  async invite(email: string, logoUrl: string) {
    const existingUser = await this.adminCreateUserSvc.getCognitoUser(email);

    if (existingUser) {
      throw new ConflictException();
    }

    let invitation = await this.upsertInvitation(email);

    await this.sendInvitationEmail(email, invitation.hash, logoUrl);

    return invitation;
  }

  async resendInvite(email: string) {
    const invitation = await this.invitationRepo.getOne({ where: { email } });
    await this.sendInvitationEmail(email, invitation.hash, logoUrl);
  }

  async inviteLinklessly(contactInfo: ContactInfoDto) {
    const { email, phone, isAnon, orgId } = contactInfo;
    const existingUser = await this.adminCreateUserSvc.getCognitoUser(email);

    if (existingUser) {
      throw new ConflictException();
    }

    let invitation = await this.upsertInvitation(email, orgId);

    await this.sendVerificationEmail(email, invitation.hash);

    return invitation;
  }

  async upsertInvitation(
    email: string,
    orgId?: string
  ) {
    const invitation = await this.invitationRepo.getOne({ where: { email } });

    if (invitation) {
      return invitation;
    }

    return await this.createInvitation({
      email,
      orgId,
    });
  }

  async createInvitationFromAdmin(invitation: Invitation, orgId?: string) {
    if (orgId) {
      invitation.orgId = orgId;
    }
    const hash = await this.hashEmail(invitation.email);
    const code = this.generateValidationCode();
    await this.invitationRepo.postOne({ ...invitation, hash, code });

    await this.sendInvitationEmail(invitation.email, hash, logoUrl);

    return invitation;
  }

  async createInvitation(invitation: Partial<Invitation>) {
    try {
      const inviteWithHash = await this.addHashAndCodeToInvitation(invitation);
      return await this.invitationRepo.postOne(
        this.formatForSave(inviteWithHash)
      );
    } catch (error) {
      console.error({ error });
      if (error.message.includes('violates unique')) {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  formatForSave(invite: Invitation): Invitation {
    return {
      ...invite,
      isAdmin: !!invite.isAdmin,
    };
  }

  async addHashAndCodeToInvitation(
    invitation: Partial<Invitation>
  ): Promise<Invitation> {
    const { email } = invitation;
    const hash = await this.hashEmail(email);
    const code = this.generateValidationCode();
    return { ...invitation, hash, code } as Invitation;
  }

  private generateValidationCode() {
    return randomInt(100000, 999999).toString();
  }

  private async hashEmail(email: string) {
    return await bcrypt.hash(email, saltRounds);
  }

  private async sendInvitationEmail(
    email: string,
    hash: string,
    logoUrl: string
  ) {
    try {
      const url = this.generateUrl(hash);

      const html = this.getInvitationEmailHtml(url, logoUrl);

      await this.emailSvc.sendEmail(
        email,
        `Evolve Email Verification`,
        html,
        ''
      );
    } catch (error) {
      console.error({
        error,
        msg: `failed to send invitation email to ${email}`,
      });

      throw error;
    }
  }

  private async sendVerificationEmail(email: string, hash: string) {
    try {
      const html = this.getVerficationEmailHtml(hash, '');

      await this.emailSvc.sendEmail(
        email,
        `Compliance Reports Email Verification`,
        html,
        ''
      );
    } catch (error) {
      console.error({
        error,
        msg: `failed to send invitation email to ${email}`,
      });

      throw error;
    }
  }

  generateUrl(hash: string) {
    return `${configureEnv().UI_URL_ACCOUNT}/email/${encodeURIComponent(hash)}`;
  }

  private getInvitationEmailHtml(url: string, logoUrl: string) {
    return html(
      'Welcome to EVOLVE!',
      `Please click the link to proceed with your account setup.`,
      [
        loginButton('VALIDATE EMAIL', url),
        p([
          'Copy the following URL and paste it into a new browser window if clicking the button does not work.',
        ]),
        p([url], 'bordered'),
      ],
      logoUrl
    );
  }

  private getVerficationEmailHtml(code: string, logoUrl: string) {
    return html(
      'Compliance Reports Email Verification',
      `Please use the code below to verify your email and proceed with your account setup.`,
      [pre([code], 'focal')],
      logoUrl
    );
  }
}

import { EmailService } from '@onivoro/server-aws-ses';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { html, loginButton, p } from '@oninet/api/feature-html';
import bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import { configureEnv } from '@oninet/api/configuration';
import { AdminCognitoService, PasswordDto } from '@onivoro/server-aws-auth';
import { InvitationRepository } from 'libs/api/repository-oninet/src/lib/repositories/invitation.repository';
import { Invitation, User, UserService } from '@oninet/api/repository-oninet';

const saltRounds = 10;

@Injectable()
export class UserInvitationService {
  constructor(
    private emailSvc: EmailService,
    private invitationRepo: InvitationRepository,
    private adminCreateUserSvc: AdminCognitoService,
    private userRepo: UserService
  ) { }

  async savePasswordAndCreateCognitoUser(
    hash: string,
    { password, confirm }: PasswordDto
  ) {
    const invitation = await this.invitationRepo.getOne({ where: { hash } });

    if (!invitation) {
      throw new BadRequestException(`no invitation found for hash ${hash}`);
    }

    if (password !== confirm) {
      throw new BadRequestException('password and confirm must match');
    }

    const {email} = invitation;
    const userId = await this.adminCreateUserSvc.adminCreateUser(email, password, {email, email_verified: 'true'});

    await this.userRepo.createUser({
      id: userId,
      email: invitation.email,
    } as User);

    await this.invitationRepo.put({email: invitation.email}, {
      userId,
    });

    await this.invitationRepo.delete({email: invitation.email});

    return invitation;
  }

  async validateEmail(hash: string) {
    const invitation = await this.invitationRepo.getOne({ where: { hash } });

    await this.invitationRepo.put({email: invitation.email}, { emailValid: true });

    return invitation;
  }

  async invite(email: string) {
    // first check if user's email exists in cognito!!!
    // not implemented yet
    // for now... just not deleting the invitation record 2 prevent duplic8s

    let hash: string;

    const invitation = await this.invitationRepo.getOne({ where: { email } });

    if (!invitation) {
      hash = await this.hashEmail(email);
      await this.saveInvitation(email, hash);
    } else {
      hash = invitation.hash;
    }

    await this.sendInvitationEmail(email, hash);

    return invitation;
  }

  async systemInvite(invitation: Invitation) {
    const hash = await this.hashEmail(invitation.email);
    const code = this.generateValidationCode();
    await this.invitationRepo.postOne({ ...invitation, hash, code });

    await this.sendInvitationEmail(invitation.email, hash);

    return invitation;
  }

  private async saveInvitation(email: string, hash: string) {
    try {
      const createdAt = new Date();
      const code = this.generateValidationCode();
      await this.invitationRepo.postOne({ email, hash, code, emailValid: false, createdAt, updatedAt: createdAt });
    } catch (error) {
      console.error({ error });
      throw new ConflictException();
    }
  }

  private generateValidationCode() {
    return randomInt(111111, 999999).toString();
  }

  private async hashEmail(email: string) {
    return await bcrypt.hash(email, saltRounds);
  }

  private async sendInvitationEmail(email: string, hash: string) {
    try {
      const url = this.generateUrl(hash);

      const html = this.getInvitationEmailHtml(url);

      await this.emailSvc.sendEmail(
        email,
        `ONIVORO.NET Email Verification`,
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

  private generateUrl(hash: string) {
    return `${configureEnv().UI_URL_ACCOUNT}/email/${encodeURIComponent(hash)}`;
  }

  private getInvitationEmailHtml(url: string) {
    return html(
      'Welcome to ONIVORO.NET!',
      `Please click the link to proceed with your account setup.`,
      [
        loginButton('VALIDATE EMAIL', url),
        p(['Copy the following URL and paste it into a new browser window if clicking the button does not work.']),
        p([url])
      ]
    );
  }
}

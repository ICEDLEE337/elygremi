import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PasswordReset,
  PasswordResetRepository,
  UserService,
} from '@oninet/api/repository-oninet';
import bcrypt from 'bcryptjs';
import { EmailService } from '@onivoro/server-aws-ses';
import { AdminCognitoService, PasswordDto } from '@onivoro/server-aws-auth';
import { configureEnv } from '@oninet/api/configuration';
import { html, loginButton, p } from '@onivoro/server-html';

const saltRounds = 12;

@Injectable()
export class PasswordResetService {
  constructor(
    private pwResetRepo: PasswordResetRepository,
    private userRepo: UserService,
    private emailSvc: EmailService,
    private adminCogSvc: AdminCognitoService
  ) {}

  async getByHash(hash: string) {
    const existingReset = await this.pwResetRepo.getOne({ where: { hash } });

    if (existingReset) {
      return true;
    }

    return false;
  }

  async startReset(email: string) {
    const record = await this.createPasswordReset(email);

    if (record) {
      await this.sendResetEmail(email, record.hash);
    }

    return record;
  }

  async completeReset(hash: string, password: PasswordDto) {
    if (password.confirm !== password.password) {
      throw new BadRequestException('Passwords must match');
    }

    const existingEntity = await this.pwResetRepo.getOne({ where: { hash } });

    if (!existingEntity) {
      throw new BadRequestException('Reset is not available');
    }

    const user = await this.userRepo.getUserByEmail(existingEntity.email);

    if (!user) {
      throw new BadRequestException('No user account found');
    } else {
      await this.pwResetRepo.patch(
        { email: existingEntity.email },
        { emailValid: true }
      );
      await this.adminCogSvc.setUserPassword(
        configureEnv().AWS_COGNITO_USER_POOL_ID,
        user.email,
        password.password
      );
      await this.pwResetRepo.delete({ email: existingEntity.email });
      return true;
    }
  }

  private async createPasswordReset(email: string) {
    const existingEntity = await this.pwResetRepo.getOne({ where: { email } });

    if (existingEntity) {
      return existingEntity;
    }

    const user = await this.userRepo.getUserByEmail(email);
    if (user) {
      const createdEntity = await this.pwResetRepo.postOne({
        email,
        hash: await this.hashEmail(email),
        userId: user.id,
      } as PasswordReset);

      return createdEntity;
    }

    return null;
  }

  private async hashEmail(email: string) {
    return await bcrypt.hash(email, saltRounds);
  }

  private async sendResetEmail(email: string, hash: string) {
    try {
      const url = this.generateUrl(hash);

      const html = this.getResetEmailHtml(url);

      await this.emailSvc.sendEmail(
        email,
        `elygremi Email Verification`,
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
    return `${configureEnv().UI_URL_ACCOUNT}/reset/${encodeURIComponent(hash)}`;
  }

  private getResetEmailHtml(url: string) {
    return html(
      'elygremi password reset request',
      `Please click the link to reset your account password setup.`,
      [
        loginButton('RESET PASSWORD', url),
        p([
          'Copy the following URL and paste it into a new browser window if clicking the button does not work.',
        ]),
        p([url]),
      ],
    );
  }
}

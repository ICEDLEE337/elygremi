import { Module } from '@nestjs/common';

import { AuthConfig, AuthModule } from '@onivoro/server-aws-auth';
import { ServerAwsSesModule } from '@onivoro/server-aws-ses';
import { moduleFactory } from '@onivoro/server-common';
import { UserController } from './controllers/user.controller';
import { UserSessionController } from './controllers/user-session.controller';
import { AdminInvitationController } from './controllers/admin-invitation.controller';
import { AdminOrgController } from './controllers/admin-org.controller';
import { AdminUserController } from './controllers/admin-user.controller';
import { DirectUserService } from './services/direct-user.service';
import { SystemService } from './services/system.service';
import { UserPasswordResetController } from './controllers/user-password-reset.controller';
import { AdminUserService } from './services/admin-user.service';
import { PasswordResetService } from './services/password-reset.service';
import { configureEnv } from '@oninet/api/configuration';
import { RepositoryOninetModule } from '@oninet/api/repository-oninet';
import { UserInvitationService } from './services/user-invitation.service';
import { UserInvitationController } from './controllers/user-invitation.controller';

@Module({})
export class ApiFeatureAccessModule {
  static configure(authConfig: AuthConfig) {

    return moduleFactory({
      module: ApiFeatureAccessModule,
      controllers: [
        AdminInvitationController,
        AdminOrgController,
        AdminUserController,
        UserPasswordResetController,
        UserSessionController,
        UserController,
        UserInvitationController,
      ],
      providers: [
        AdminUserService,
        DirectUserService,
        PasswordResetService,
        SystemService,
        UserInvitationService,
      ],
      imports: [
        AuthModule.configure(authConfig),
        RepositoryOninetModule.configure(),
        ServerAwsSesModule.configure({
          ...configureEnv(),
          Source: 'verification@email.onivoro.net',
        }),
      ],
    });
  }
}

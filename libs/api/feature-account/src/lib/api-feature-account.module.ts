import { Module } from '@nestjs/common';
import { ServerCommonModule } from '@onivoro/server-common';
import { ServerAwsSesModule } from '@onivoro/server-aws-ses';
import { AuthModule } from '@onivoro/server-aws-auth';
import { ApiFeatureUserModule, UserClaimService } from '@oninet/api/feature-user';
import { RepositoryOninetModule } from '@oninet/api/repository-oninet';
import { UserInfoController } from './controllers/user-info.controller';
import { UserClaimController } from './controllers/user-claim.controller';
import { TwilioService } from './services/twilio.service';
import { UserInvitationController } from './controllers/user-invitation.controller';
import { UserInvitationService } from './services/user-invitation.service';
import { UserPasswordResetController } from './controllers/user-reset-password.controller';
import { moduleFactory } from '@onivoro/server-common';
import { configureEnv } from '@oninet/api/configuration';
import { FileController } from './controllers/file.controller';
import { ServerAwsS3Module } from '@onivoro/server-aws-s3';
import { AkeneoProductController } from './controllers/akeneo-product.controller';

@Module({})
export class ApiFeatureAccountModule {
  static configure() {
    return moduleFactory({
      module: ApiFeatureAccountModule,
      imports: [
        ApiFeatureUserModule.configure(),
        AuthModule.configure({mfaEnabled: false, ...configureEnv()}),
        ServerAwsSesModule.configure({...configureEnv(), Source: 'verification@email.onivoro.net'}),
        ServerAwsS3Module.configure({...configureEnv(), AWS_BUCKET: configureEnv().AWS_BUCKET_UPLOADS}),
        RepositoryOninetModule.configure(),
        ServerCommonModule,
      ],
      controllers: [
        FileController,
        AkeneoProductController,
        UserClaimController,
        UserInfoController,
        UserInvitationController,
        UserPasswordResetController
      ],
      providers: [UserClaimService, TwilioService, UserInvitationService],
    })
  }
}

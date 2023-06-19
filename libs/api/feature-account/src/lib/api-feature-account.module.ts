import { Module } from '@nestjs/common';
import { ServerCommonModule } from '@onivoro/server-common';
import { ServerAwsSesModule } from '@onivoro/server-aws-ses';
import { AuthModule } from '@onivoro/server-aws-auth';
import { RepositoryOninetModule } from '@oninet/api/repository-oninet';
import { moduleFactory } from '@onivoro/server-common';
import { configureEnv } from '@oninet/api/configuration';
import { FileController } from './controllers/file.controller';
import { ServerAwsS3Module } from '@onivoro/server-aws-s3';
import { AkeneoProductController } from './controllers/akeneo-product.controller';
import { ApiFeatureAccessModule } from '@oninet/api/feature-access';

@Module({})
export class ApiFeatureAccountModule {
  static configure() {
    return moduleFactory({
      module: ApiFeatureAccountModule,
      imports: [
        ApiFeatureAccessModule.configure({mfaEnabled: false, ...configureEnv()}),
        AuthModule.configure({mfaEnabled: false, ...configureEnv()}),
        ServerAwsSesModule.configure({...configureEnv(), Source: 'verification@email.onivoro.net'}),
        ServerAwsS3Module.configure({...configureEnv(), AWS_BUCKET: configureEnv().AWS_BUCKET_UPLOADS}),
        RepositoryOninetModule.configure(),
        ServerCommonModule,
      ],
      controllers: [
        FileController,
        AkeneoProductController,
      ],
      providers: [],
    })
  }
}

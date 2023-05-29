import { Module } from '@nestjs/common';
import { RepositoryOninetModule } from '@oninet/api/repository-oninet';
import { moduleFactory } from '@onivoro/server-common';
import { UserInfoController } from '../../../feature-account/src/lib/controllers/user-info.controller';
import { UserClaimController } from '../../../feature-account/src/lib/controllers/user-claim.controller';
import { UserClaimService } from '../../../feature-account/src/lib/services/user-claim.service';

@Module({})
export class ApiFeatureUserModule {
  static configure() {
    return moduleFactory({
      module: ApiFeatureUserModule,
      controllers: [
        UserInfoController,
        UserClaimController
      ],
      providers: [UserClaimService],
      imports: [
        RepositoryOninetModule.configure(),
      ],
    });
  }
}

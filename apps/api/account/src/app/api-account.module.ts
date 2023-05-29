import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServerCommonModule } from '@onivoro/server-common';
import { AuthMiddleware, AuthModule } from '@onivoro/server-aws-auth';
import { ApiFeatureAccountModule } from '@oninet/api/feature-account';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configureEnv } from '@oninet/api/configuration';
import { ApiFeatureInventoryModule } from '@oninet/api/feature-inventory';

@Module({
  imports: [
    ServerCommonModule,
    AuthModule.configure({mfaEnabled: false, ...configureEnv()}),
    ApiFeatureAccountModule.configure(),
    ApiFeatureInventoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets', 'ui'),
    }),
  ],
})
export class ApiAccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

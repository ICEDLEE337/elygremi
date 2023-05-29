import { DynamicModule, Module } from '@nestjs/common';
import { ServerTypeormPostgresModule } from '@onivoro/server-typeorm-postgres';
import { entities } from './entities/entities.constant';
import { repositories } from './repositories/repositories.constant';
import { configureEnv } from '@oninet/api/configuration';
import { services } from './services/services.constant';

const providers = [
  ...repositories,
  ...services
];

@Module({})
export class RepositoryOninetModule {
  static configure(): DynamicModule {

    const {
      PG_HOST: host,
      PG_PASSWORD: password,
      PG_PORT: port,
      PG_USER: username,
      PG_SYNC: synchronize,
    } = configureEnv();

    const configuredPostgresModule = ServerTypeormPostgresModule.configure(
      repositories,
      entities,
      { database: 'oninet', host, password, port, username, synchronize }
    );
    return {
      module: RepositoryOninetModule,
      imports: [configuredPostgresModule],
      providers,
      exports: [configuredPostgresModule, ...providers],
    };
  }
}

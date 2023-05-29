import { configureEnv } from '@oninet/api/configuration';
import { dataSourceConfigFactory } from '@onivoro/server-typeorm-postgres';
import { DataSource } from 'typeorm';
import { AuroraPostgresConnectionOptions } from 'typeorm/driver/aurora-postgres/AuroraPostgresConnectionOptions';
import { entities } from './entities/entities.constant';

const {
  AWS_REGION: region,
  PG_HOST: host,
  PG_PASSWORD: password,
  PG_PORT: port,
  PG_USER: username
 } = configureEnv();

const dataSourceOptions: AuroraPostgresConnectionOptions = {
  ...dataSourceConfigFactory('default', {database: 'oninet', host, password, port, username}, entities),
  migrations: ['libs/api/repository-oninet/src/lib/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'libs/api/repository-oninet/src/lib/entities',
    migrationsDir: 'libs/api/repository-oninet/src/lib/migrations',
  },
  region
} as any;

export const connectionSource = new DataSource(dataSourceOptions);

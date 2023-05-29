import { dataSourceConfigFactory } from '@onivoro/server-typeorm-postgres';
import { configureEnv } from '@oninet/api/configuration';
import { entities } from './entities/entities.constant';

const {
  PG_HOST: host,
  PG_PASSWORD: password,
  PG_PORT: port,
  PG_USER: username
 } = configureEnv();

export const oninetDataSourceConfigFactory = dataSourceConfigFactory(
  'default',
  {database: 'oninet', host, password, port, username},
  entities
) as any;

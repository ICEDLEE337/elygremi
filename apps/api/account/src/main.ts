import { createApiApp } from '@onivoro/server-common';
import { ApiAccountModule } from './app/api-account.module';

async function bootstrap() {
  await createApiApp(ApiAccountModule, Number(process.env.PORT) || 3456, 'api-account');
}

bootstrap();

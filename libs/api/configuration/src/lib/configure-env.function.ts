import { EnvVarKey } from './env-var-keys.enum';
import { loadDotEnv} from '@onivoro/server-parameterization'

export function configureEnv(): { [key in EnvVarKey]: any } {
  loadDotEnv();

  const { env } = process;

  return {
    [EnvVarKey.AWS_ACCESS_KEY_ID]: env[EnvVarKey.AWS_ACCESS_KEY_ID],
    [EnvVarKey.AWS_BUCKET_UPLOADS]:
      env[EnvVarKey.AWS_BUCKET_UPLOADS],
    [EnvVarKey.AWS_COGNITO_CLIENT_ID]: env[EnvVarKey.AWS_COGNITO_CLIENT_ID],
    [EnvVarKey.AWS_COGNITO_USER_POOL_ID]:
      env[EnvVarKey.AWS_COGNITO_USER_POOL_ID],
    [EnvVarKey.AWS_REGION]: env[EnvVarKey.AWS_REGION],
    [EnvVarKey.AWS_SECRET_ACCESS_KEY]: env[EnvVarKey.AWS_SECRET_ACCESS_KEY],
    [EnvVarKey.NODE_ENV]: env[EnvVarKey.NODE_ENV],
    [EnvVarKey.PG_CONNECTIONTIMEOUTMILLIS]:
      env[EnvVarKey.PG_CONNECTIONTIMEOUTMILLIS],
    [EnvVarKey.PG_HOST]: env[EnvVarKey.PG_HOST],
    [EnvVarKey.PG_PASSWORD]: env[EnvVarKey.PG_PASSWORD],
    [EnvVarKey.PG_PORT]: env[EnvVarKey.PG_PORT],
    [EnvVarKey.PG_USER]: env[EnvVarKey.PG_USER],
    [EnvVarKey.PG_SYNC]: env[EnvVarKey.PG_SYNC],
    [EnvVarKey.PORT]: env[EnvVarKey.PORT],
    [EnvVarKey.UI_URL_ACCOUNT]: env[EnvVarKey.UI_URL_ACCOUNT],
  };
}

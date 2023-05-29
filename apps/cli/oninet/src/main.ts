import { CommandFactory } from 'nest-commander';
import { CliOninetModule } from './app/cli-oninet.module';

async function bootstrap() {
  await CommandFactory.run(CliOninetModule, ['warn', 'error']);
}

void bootstrap();

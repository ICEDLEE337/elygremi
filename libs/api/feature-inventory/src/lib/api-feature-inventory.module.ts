import { Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import { InventoryController } from './controllers/inventory.controller';
import { RepositoryOninetModule } from '@oninet/api/repository-oninet';
import { ServerAwsS3Module } from '@onivoro/server-aws-s3';
import { configureEnv } from '@oninet/api/configuration';
import { ImageUploadService } from './services/image-upload.service';
import { InventoryService } from './services/inventory.service';
import { PublicInventoryController } from './controllers/public-inventory.controller';

@Module(moduleFactory({
  controllers: [InventoryController, PublicInventoryController],
  providers: [ImageUploadService, InventoryService],
  imports: [RepositoryOninetModule.configure(), ServerAwsS3Module.configure({...configureEnv(), AWS_BUCKET: configureEnv().AWS_BUCKET_UPLOADS})]
}))
export class ApiFeatureInventoryModule {}

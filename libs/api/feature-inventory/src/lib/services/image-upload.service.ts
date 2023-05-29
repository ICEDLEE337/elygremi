import { Injectable } from "@nestjs/common";
import 'multer';
import { S3Service, sanitizeFilename } from '@onivoro/server-aws-s3';
import { InventoryRepository } from "@oninet/api/repository-oninet";

@Injectable()
export class ImageUploadService {
  constructor(private inventoryRepo: InventoryRepository, private s3Svc: S3Service) { }

  async putInventoryImageByInventoryId(
    azVehicleId: string,
    files?: Array<Express.Multer.File>
  ) {
    if (files?.length) {
      const { key } = await this.uploadAttachment(``, files[0]);

      await this.inventoryRepo.put({ azVehicleId }, { s3Key: key })
    }

    return await this.inventoryRepo.getOne({ where: { azVehicleId } });
  }

  private async uploadAttachment(path: string, file: Express.Multer.File) {
    const filename = sanitizeFilename(file.originalname);
    const key = path ? `${path}/${filename}` : filename;
    const url = await this.s3Svc.upload({ Key: key, Body: file.buffer as any });
    return { key, url };
  }
}
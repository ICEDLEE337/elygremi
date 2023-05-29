import { Injectable } from "@nestjs/common";
import { Inventory, InventoryRepository } from "@oninet/api/repository-oninet";
import { S3Service } from "@onivoro/server-aws-s3";
import { ImageUploadService } from "./image-upload.service";

@Injectable()
export class InventoryService {
    constructor(private inventoryRepo: InventoryRepository, private s3Svc: S3Service, private imageUploadSvc: ImageUploadService, ) { }

    async post(inventory: Inventory, file?: Express.Multer.File): Promise<Inventory> {

        const persistedInventoryRecord = await this.inventoryRepo.postOne(inventory);

        return await this.imageUploadSvc.putInventoryImageByInventoryId(
            persistedInventoryRecord.azVehicleId,
            [file]
        );
    }

    async put(azVehicleId: string, body: Inventory, file?: Express.Multer.File): Promise<Inventory> {
        if (file) {
            await this.imageUploadSvc.putInventoryImageByInventoryId(
                azVehicleId,
                [file]
            );
        }

        if (Object.keys(body || {}).length) {
            await this.inventoryRepo.put({ azVehicleId }, body);
        }

        return await this.get(azVehicleId);
    }

    async getDashboard(pagingKey: string, search: string, pageSize: number) {
        const inventoryResponse = await this.inventoryRepo.getDashboard(
            pagingKey,
            search,
            pageSize
        );

        return {...inventoryResponse, data: await Promise.all(inventoryResponse.data.map(i => this.presign(i))) };
    }

    async get(azVehicleId: string) {
        return this.presign(await this.inventoryRepo.getOne({ where: { azVehicleId } }));
    }

    async index(): Promise<Inventory[]> {
        const entities = await this.inventoryRepo.getMany({});
        return Promise.all((entities).map(i => this.presign(i)));
    }

    async presign(inventory: Inventory): Promise<Inventory> {
        if (!inventory.s3Key) {
            return inventory;
        }

        console.log(inventory)

        return { ...inventory, s3Url: await this.s3Svc.getAssetUrl({ Key: inventory.s3Key }) };
    }
}
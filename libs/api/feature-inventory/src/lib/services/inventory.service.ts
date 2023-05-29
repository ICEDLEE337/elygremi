import { Injectable } from "@nestjs/common";
import { Inventory, InventoryRepository } from "@oninet/api/repository-oninet";
import { S3Service } from "@onivoro/server-aws-s3";
import { ImageUploadService } from "./image-upload.service";
import { v4 } from "uuid";

@Injectable()
export class InventoryService {
    constructor(private inventoryRepo: InventoryRepository, private s3Svc: S3Service, private imageUploadSvc: ImageUploadService, ) { }

    async post(inventory: Inventory, file?: Express.Multer.File): Promise<Inventory> {

        const persistedInventoryRecord = await this.inventoryRepo.postOne({...inventory, id: v4()});

        return await this.imageUploadSvc.putInventoryImageByInventoryId(
            persistedInventoryRecord.id,
            [file]
        );
    }

    async put(id: string, body: Inventory, file?: Express.Multer.File): Promise<Inventory> {
        if (file) {
            await this.imageUploadSvc.putInventoryImageByInventoryId(
                id,
                [file]
            );
        }

        if (Object.keys(body || {}).length) {
            await this.inventoryRepo.put({ id }, body);
        }

        return await this.get(id);
    }

    async getDashboard(pagingKey: string, search: string, pageSize: number) {
        const inventoryResponse = await this.inventoryRepo.getDashboard(
            pagingKey,
            search,
            pageSize
        );

        return {...inventoryResponse, data: await Promise.all(inventoryResponse.data.map(i => this.presign(i))) };
    }

    async get(id: string) {
        return this.presign(await this.inventoryRepo.getOne({ where: { id } }));
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
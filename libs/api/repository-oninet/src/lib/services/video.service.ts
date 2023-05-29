import { Injectable } from "@nestjs/common";
import { DataSource, FindOptionsWhere, In } from "typeorm";
import { Video } from "../entities/video.entity";
import { VideoRepository } from "../repositories/video.repository";
import { S3 } from 'aws-sdk';

const order = { name: 'asc' as any };

@Injectable()
export class VideoService {
    constructor(private videoRepo: VideoRepository, private dataSource: DataSource, s3: S3) { }

    async storeVideoInLibrary(vid: Video) {
        await this.dataSource.transaction(async entityManager => {
            const videoRepo = new VideoRepository(entityManager);

            await videoRepo.postOne(vid);
        });
    }

    getAllVideos() {
        return this.videoRepo.getMany({ order });
    }

    async getVideoById(id: string): Promise<Video> {
        const where: FindOptionsWhere<Video> = { id };
        const video = await this.videoRepo.getOne({ where });

        return video;
    }
}

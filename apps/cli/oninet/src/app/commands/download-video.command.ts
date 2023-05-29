import { DownloadService } from '@onivoro/server-yt-dl';
import { Command, Option } from 'nest-commander';
import { AbstractCommand } from './abstract.command';
import { createWriteStream } from 'node:fs';

type IParams = { url: string, extension: string };

@Command({ name: Download.name })
export class Download extends AbstractCommand<IParams> {

    async main(args: string[], { url, extension }: IParams): Promise<void> {
        const { stream, fileName } = await this.dlSvc.download(url, extension);
        const ws = createWriteStream(fileName);
        stream.pipe(ws);
    }

    constructor(private dlSvc: DownloadService) {
        super(Download.name);
    }

    @Option({
        flags: '-u, --url [url]',
        description: 'Youtube URL',
        required: true
    })
    parseUrl(val?: string) {
        return val;
    }


    @Option({
        flags: '-x, --extension [extension]',
        description: 'mp3 or mp4',
        defaultValue: 'mp4'
    })
    parseExtension(val?: string) {
        return val;
    }
}

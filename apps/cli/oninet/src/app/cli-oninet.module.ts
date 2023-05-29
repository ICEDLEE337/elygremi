import { Module } from "@nestjs/common";
import { ServerBuildModule } from '@onivoro/server-build';
import { ServerYtDlModule } from '@onivoro/server-yt-dl';
import { Download } from "./commands/download-video.command";

@Module({
    providers: [
        Download
    ],
    imports: [
        ServerBuildModule,
        ServerYtDlModule
    ]
})
export class CliOninetModule { }

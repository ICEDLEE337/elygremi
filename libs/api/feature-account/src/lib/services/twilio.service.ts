import { Injectable } from "@nestjs/common";

@Injectable()
export class TwilioService {
    constructor() { }

    async sendSms(phone: string, message: string) { }
}
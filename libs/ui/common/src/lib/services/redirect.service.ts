import { Injectable } from "@angular/core";
import { Config } from "../providers/config.class";

@Injectable({providedIn: 'root'})
export class RedirectService {
    constructor(private config: Config) {}

    getLoginRedirectUrl () {
        const {href} = window.location;
        const target = `${this.config.uiUrlAccount}/login`;

        if (href.includes(this.config.uiUrlAccount)) {
            return target;
        }

        return `${target}/${encodeURIComponent(href)}`;
    }
}
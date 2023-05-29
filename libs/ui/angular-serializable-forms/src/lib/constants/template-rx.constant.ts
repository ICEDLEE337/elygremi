import { template } from "./template.constant";

export const templateRx = template
    .replace('[data]="data"', '[data]="data$ | async"')
    .replace('[uiOptions]="options"', '[uiOptions]="options$ | async"');

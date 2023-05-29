import { EventEmitter } from "@angular/core";
import { IFieldConfig } from "./field-config.interface";

export interface IDynaForm<TData> {
    data: TData
    options: IFieldConfig;
    readOnly?: boolean;
    statusChange: EventEmitter<boolean>;
    valueChange: EventEmitter<TData>;
}
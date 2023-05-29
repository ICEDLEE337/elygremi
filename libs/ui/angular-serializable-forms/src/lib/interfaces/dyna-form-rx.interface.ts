import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { IFieldConfig } from "./field-config.interface";

export interface IDynaFormRx<TData> {
    data: Observable<TData>
    options: Observable<IFieldConfig>;
    readOnly?: boolean;
    statusChange: EventEmitter<boolean>;
    valueChange: EventEmitter<TData>;
}
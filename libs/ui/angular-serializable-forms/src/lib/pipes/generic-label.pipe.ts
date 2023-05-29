import { Pipe, PipeTransform } from '@angular/core';
import { IFieldConfig } from '../interfaces/field-config.interface';

@Pipe({ name: 'labelFor' })
export class GenericLabelPipe implements PipeTransform {
  transform(uiOptions: IFieldConfig, controlName: string) {
    return (uiOptions?.fieldOptions || {})[controlName]?.label;
  }
}

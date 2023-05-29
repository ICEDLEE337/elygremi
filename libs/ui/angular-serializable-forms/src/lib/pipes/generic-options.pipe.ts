import { Pipe, PipeTransform } from '@angular/core';
import { IFieldConfig } from '../interfaces/field-config.interface';

@Pipe({ name: 'optionsFor' })
export class GenericOptionsPipe implements PipeTransform {
  transform(uiOptions: IFieldConfig, controlName: string) {
    return (uiOptions?.fieldOptions || {})[controlName]?.options;
  }
}

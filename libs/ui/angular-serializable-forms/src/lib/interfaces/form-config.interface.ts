import { IFieldConfig } from './field-config.interface';

export interface IFormConfig<External, Internal> {
  fieldConfig: IFieldConfig;
  toFormModel?: (external: External) => Internal;
  fromFormModel?: (internal: Internal) => External
}

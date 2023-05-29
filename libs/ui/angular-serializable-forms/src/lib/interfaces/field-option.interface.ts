import { ILookup } from './lookup.interface';

export interface IFieldOption {
  label: string;
  options?: ILookup<string, string>[];
  type: string;
  readOnly?: boolean;
  validators?: any[];
  min?: number;
  max?: number;
  step?: number;
  multiple?: boolean;
}

export type IFormatter = (controlDisplayName?: string, data?: any) => string;

export interface IFormatterDataMax {
  max: number;
}

export interface IFormatterDataMin {
  min: number;
}

export interface IFormatterDataLength {
  requiredLength: number;
}

export interface IFormatterDataPattern {
  requiredPattern: string;
}

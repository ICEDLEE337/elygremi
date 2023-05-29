import { Route } from '@angular/router';

export type TIconicRoute = Route & {
  icon?: string;
  label?: string;
  targetBlank?: boolean;
  href?: string;
};

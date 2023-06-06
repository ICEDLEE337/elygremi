import { Routes } from '@angular/router';
import { InventoryPageComponent } from '@oninet/ui-inventory';

export const routes: Routes = [
  { path: '', component: InventoryPageComponent, pathMatch: 'full' },
] as any;

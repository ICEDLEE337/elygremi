import { Routes } from '@angular/router';
import { InventoryPageComponent, SchematicPageComponent } from '@oninet/ui-inventory';

export const routes: Routes = [
  { path: '', component: SchematicPageComponent, pathMatch: 'full' },
] as any;

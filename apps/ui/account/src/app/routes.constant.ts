import { Routes } from '@angular/router';
import { InventoryPageComponent, SchematicPageComponent } from '@oninet/ui-inventory';

export const routes: Routes = [
  { path: 'inventory', component: InventoryPageComponent, pathMatch: 'full' },
  { path: '', component: SchematicPageComponent, pathMatch: 'full' },
] as any;

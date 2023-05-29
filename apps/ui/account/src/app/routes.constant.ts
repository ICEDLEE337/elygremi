import { Routes } from '@angular/router';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';

export const routes: Routes = [
  { path: '', component: InventoryPageComponent, pathMatch: 'full' },
] as any;

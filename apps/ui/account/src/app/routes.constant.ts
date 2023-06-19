import { Routes } from '@angular/router';
import { InventoryPageComponent, SchematicPageComponent } from '@oninet/ui-inventory';
import { SystemOrgCreatePageComponent } from './pages/system-org-create-page/system-org-create-page.component';
import { AdminOrgPageComponent } from './pages/admin-org-page/admin-org-page.component';
import { SystemOrgsPageComponent } from './pages/system-orgs-page/system-orgs-page.component';

export const routes: Routes = [
  { path: 'inventory', component: InventoryPageComponent, pathMatch: 'full' },
  { path: 'system/orgs', component: SystemOrgsPageComponent, pathMatch: 'full' },
  { path: 'admin/create/org', component: SystemOrgCreatePageComponent, pathMatch: 'full' },
  { path: 'admin/org/:id', component: AdminOrgPageComponent, pathMatch: 'full' },
  { path: 'schematic', component: SchematicPageComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'system/orgs', pathMatch: 'full' },
] as any;

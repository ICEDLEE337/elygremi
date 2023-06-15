import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { InventoryCardComponent } from './components/inventory-card/inventory-card.component';
import { InventoryDialogComponent } from './components/inventory-dialog/inventory-dialog.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { Config, MaterialModule, UiCommonModule, accountApiProvider } from '@oninet/ui/common';
import { SchematicPageComponent } from './pages/schematic-page/schematic-page.component';
import { AngularInkscapeModule } from '@onivoro/angular-inkscape';
import { TestPageComponent } from './pages/test-page/test-page.component';

const pages = [InventoryPageComponent, SchematicPageComponent, TestPageComponent];

const components = [
  DownloadButtonComponent,
  InventoryTableComponent,
  InventoryFormComponent,
  InventoryDialogComponent,
  SearchFormComponent,
  FileUploadComponent,
  InventoryCardComponent,
];

const directives: any[] = [];

const declarations = [...components, ...pages, ...directives];

@NgModule({
  declarations,
      exports: declarations,
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        AngularInkscapeModule,
        CommonModule,
        MaterialModule,
        UiCommonModule
      ],
      entryComponents: [InventoryPageComponent],
})
export class UiInventoryModule {}

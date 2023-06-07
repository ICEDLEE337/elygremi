import { NgModule } from '@angular/core';
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

const pages = [InventoryPageComponent];

const components = [
  DownloadButtonComponent,
  InventoryTableComponent,
  InventoryFormComponent,
  InventoryDialogComponent,
  SearchFormComponent,
  FileUploadComponent,
  InventoryCardComponent,
];

const declarations = [...components, ...pages];

@NgModule({
  declarations,
      exports: declarations,
      imports: [
        CommonModule,
        MaterialModule,
        UiCommonModule
      ],
      entryComponents: [InventoryPageComponent],
})
export class UiInventoryModule {}

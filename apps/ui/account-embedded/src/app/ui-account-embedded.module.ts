import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { accountApiProvider, MaterialModule, UiCommonModule } from '@oninet/ui/common';
import { environment } from '../environments/environment';
import { UiInventoryModule } from '@oninet/ui-inventory';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UiCommonModule.configure(environment),
    UiInventoryModule,
  ],
  providers: [
    accountApiProvider(
      environment
    ),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class UiAccountEmbeddedModule {}


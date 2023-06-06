import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { accountApiProvider, MaterialModule, UiCommonModule } from '@oninet/ui/common';
import { environment } from '../environments/environment';
import { UiInventoryModule } from '@oninet/ui-inventory';

@NgModule({
  imports: [
    UiCommonModule.configure(environment),
    MaterialModule,
    UiInventoryModule,
  ],
  providers: [
    accountApiProvider(
      environment
    ),
  ],
  bootstrap: [AppComponent],
})
export class UiAccountEmbeddedModule {}


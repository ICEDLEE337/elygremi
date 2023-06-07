import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UiAccountEmbeddedModule } from './app/ui-account-embedded.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(UiAccountEmbeddedModule)
  .catch((err) => console.error(err));

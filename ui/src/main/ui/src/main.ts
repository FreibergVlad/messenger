import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/modules/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import 'hammerjs';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

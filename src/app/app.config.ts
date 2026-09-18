import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { ResourceHandler } from '@ngx-resource/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { routes } from './app.routes';
import { MemoryDataService } from './mocks/memory-data.service';
import { AppResourceHandler } from './core/handlers/app-resource-handler';

export function appHandlerFactory(http: HttpClient, db: MemoryDataService, router: Router): AppResourceHandler {
  return new AppResourceHandler(http, db, router);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
      }),
    ),
    { provide: ResourceHandler, useFactory: appHandlerFactory, deps: [HttpClient, MemoryDataService, Router] },
  ],
};

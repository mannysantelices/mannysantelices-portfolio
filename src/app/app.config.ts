import { LocationStrategy, TrailingSlashPathLocationStrategy } from '@angular/common';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo/seo-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // Canonical URLs end in a slash (GitHub Pages serves <route>/index.html).
    { provide: LocationStrategy, useExisting: TrailingSlashPathLocationStrategy },
    // Per-route title, meta tags, canonical and JSON-LD, applied after every navigation.
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    provideClientHydration(),
  ],
};

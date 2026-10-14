import { Injectable, Signal, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

function pathOf(url: string): string {
  const withoutFragment = url.split('#')[0];
  return withoutFragment.split('?')[0];
}

/**
 * The active route's path, for same-page fragment links. Under `<base href>` a bare
 * `href="#contact"` points at the home page, so every fragment link is rendered as
 * `[routerLink]="path()" fragment="..."`.
 */
@Injectable({ providedIn: 'root' })
export class CurrentRouteService {
  private readonly router = inject(Router);
  private readonly currentPath = signal<string>(pathOf(this.router.url));

  /** For example `/` or `/about`. */
  readonly path: Signal<string> = this.currentPath.asReadonly();

  constructor() {
    this.router.events.subscribe((event: unknown) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(pathOf(event.urlAfterRedirects));
      }
    });
  }
}

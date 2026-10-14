import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

const THEME_ATTRIBUTE: string = 'data-theme';
const STORAGE_KEY: string = 'theme';

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Theme state for the toggle. The saved theme is applied before first paint by the inline
 * script in `index.html`; this service only reads the result and handles later changes.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isDark = signal<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      this.isDark.set(this.readInitialTheme() === 'dark');
    }
  }

  toggle(): void {
    if (!this.isBrowser) {
      return;
    }
    const next: Theme = this.isDark() ? 'light' : 'dark';
    this.document.documentElement.setAttribute(THEME_ATTRIBUTE, next);
    this.isDark.set(next === 'dark');
    this.save(next);
  }

  private readInitialTheme(): Theme {
    const applied = this.document.documentElement.getAttribute(THEME_ATTRIBUTE);
    if (isTheme(applied)) {
      return applied;
    }
    const view = this.document.defaultView;
    if (view && typeof view.matchMedia === 'function') {
      const prefersDark = view.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  }

  private save(theme: Theme): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode, policy). The theme still applies for this visit.
    }
  }
}

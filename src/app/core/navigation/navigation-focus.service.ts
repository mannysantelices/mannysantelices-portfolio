import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';

import { MAIN_FRAGMENT } from '../site/nav.data';

/**
 * Scroll and focus after navigation.
 * - The router scrolls to a fragment with `window.scrollTo`, which ignores CSS scroll padding,
 *   so the fixed-header offset is read from `scroll-padding-top` (one source: `--anchor-offset`).
 *   The router then focuses the target itself; targets carry `tabindex="-1"`.
 * - After a page change with no fragment, focus moves to `<main>`.
 */
@Injectable({ providedIn: 'root' })
export class NavigationFocusService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly scroller = inject(ViewportScroller);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  start(): void {
    if (!this.isBrowser) {
      return;
    }
    this.scroller.setOffset(() => [0, this.readAnchorOffset()]);
    this.router.events.subscribe((event: unknown) => {
      if (event instanceof Scroll) {
        this.focusMainAfterPageChange(event);
      }
    });
  }

  private focusMainAfterPageChange(event: Scroll): void {
    const isPageChange = event.routerEvent instanceof NavigationEnd && !event.anchor;
    if (isPageChange) {
      this.document.getElementById(MAIN_FRAGMENT)?.focus({ preventScroll: true });
    }
  }

  private readAnchorOffset(): number {
    const view = this.document.defaultView;
    if (!view) {
      return 0;
    }
    const padding = view.getComputedStyle(this.document.documentElement).scrollPaddingTop;
    const offset = Number.parseFloat(padding);
    return Number.isNaN(offset) ? 0 : offset;
  }
}

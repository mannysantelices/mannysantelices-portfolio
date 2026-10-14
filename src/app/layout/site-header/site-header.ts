import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { CONTACT_FRAGMENT, CONTACT_LABEL, PRIMARY_NAV_LINKS } from '../../core/site/nav.data';
import { BUSINESS_NAME } from '../../core/site/site.config';
import { ThemeService } from '../../core/theme/theme.service';
import { Wordmark, splitWordmark } from './wordmark';

/** Must match the header breakpoint in `styles/_header-menu.scss`. */
const DESKTOP_QUERY: string = '(min-width: 1200px)';

/**
 * Fixed header: wordmark, primary links, theme toggle, contact control. Below 1200 px the links
 * sit in a disclosure panel (not a modal: no focus trap, no scroll lock).
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  host: { '(document:pointerdown)': 'onDocumentPointerDown($event)' },
})
export class SiteHeader {
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly isCollapsed = signal<boolean>(false);

  protected readonly theme = inject(ThemeService);
  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly wordmark: Wordmark = splitWordmark(BUSINESS_NAME);
  protected readonly links = PRIMARY_NAV_LINKS;
  protected readonly contactLabel = CONTACT_LABEL;
  protected readonly contactFragment = CONTACT_FRAGMENT;
  protected readonly exactMatch = { exact: true };
  protected readonly isMenuOpen = signal<boolean>(false);

  /**
   * `inert` is set by script only, never in the served HTML: there it would disable the
   * navigation at desktop width or when the script fails. CSS `visibility` hides the panel.
   */
  protected readonly menuInert = computed<'' | null>(() => {
    const isClosedPanel = this.isCollapsed() && !this.isMenuOpen();
    return isClosedPanel ? '' : null;
  });

  constructor() {
    afterNextRender(() => this.watchBreakpoint());
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen: boolean) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected closeMenuAndRefocus(): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.closeMenu();
    this.menuButton().nativeElement.focus();
  }

  protected onFocusOut(event: FocusEvent): void {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && !this.host.nativeElement.contains(nextTarget)) {
      this.closeMenu();
    }
  }

  protected onDocumentPointerDown(event: Event): void {
    const target = event.target;
    if (target instanceof Node && !this.host.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  private watchBreakpoint(): void {
    const view = this.document.defaultView;
    if (!view || typeof view.matchMedia !== 'function') {
      return;
    }
    const desktop = view.matchMedia(DESKTOP_QUERY);
    this.isCollapsed.set(!desktop.matches);
    desktop.addEventListener('change', (change: MediaQueryListEvent) => {
      this.isCollapsed.set(!change.matches);
      if (change.matches) {
        this.closeMenu();
      }
    });
  }
}

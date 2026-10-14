import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CurrentRouteService } from './core/navigation/current-route.service';
import { NavigationFocusService } from './core/navigation/navigation-focus.service';
import { RevealService } from './core/reveal/reveal.service';
import { MAIN_FRAGMENT } from './core/site/nav.data';
import { ContactSection } from './features/contact/contact-section';
import { IconSprite } from './layout/icon-sprite/icon-sprite';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';

/**
 * Shell: skip link, header, `<main>` (routed page, then the shared contact section) and the
 * footer outside `<main>`. Composes and starts shell-wide behaviour; holds no logic itself.
 */
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, ContactSection, IconSprite, SiteFooter, SiteHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly mainFragment = MAIN_FRAGMENT;

  constructor() {
    inject(NavigationFocusService).start();
    inject(RevealService).start();
  }
}

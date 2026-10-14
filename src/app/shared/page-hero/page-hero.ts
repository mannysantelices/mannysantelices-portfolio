import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { PAGE_META } from '../../core/seo/page-meta.data';
import { CONTACT_FRAGMENT, HOME_LINK } from '../../core/site/nav.data';
import { HeroCopy } from '../content.model';

/** The hero every page starts with: breadcrumb (not on home), the one `h1`, lede, two buttons. */
@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  templateUrl: './page-hero.html',
})
export class PageHero {
  readonly copy = input.required<HeroCopy>();

  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly contactFragment = CONTACT_FRAGMENT;
  protected readonly homeLink = HOME_LINK;
  /** Same label as the breadcrumb in the JSON-LD; `null` on the home page, which has no trail. */
  protected readonly breadcrumbLabel = computed<string | null>(() => {
    const pageId = this.copy().pageId;
    if (pageId === 'home') {
      return null;
    }
    return PAGE_META[pageId].breadcrumbLabel;
  });
}

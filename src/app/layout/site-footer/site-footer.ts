import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { CONTACT_FRAGMENT, CONTACT_LABEL, FOOTER_NAV_LINKS } from '../../core/site/nav.data';
import { BUSINESS_NAME, REGION_LINE } from '../../core/site/site.config';

/**
 * Content-info landmark, outside `<main>`. Its navigation is the route to every page and to the
 * contact section when the header menu cannot work (no script), so it must stay plain links.
 */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly links = FOOTER_NAV_LINKS;
  protected readonly contactLabel = CONTACT_LABEL;
  protected readonly contactFragment = CONTACT_FRAGMENT;
  protected readonly exactMatch = { exact: true };
  protected readonly businessName = BUSINESS_NAME;
  /** The region words here make `areaServed` true on every route (criterion 46). */
  protected readonly footerLine = `${BUSINESS_NAME}. Websites and DevSecOps on AWS. ${REGION_LINE}.`;
  /** Evaluated at prerender, so the served HTML carries the build year. */
  protected readonly year = new Date().getFullYear();
}

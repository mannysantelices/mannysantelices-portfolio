import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { PageId } from '../site/page-id';
import { BING_SITE_VERIFICATION, GOOGLE_SITE_VERIFICATION } from '../site/site.config';
import { buildMetaTags, buildVerificationTags } from './meta-tags.builder';
import { PAGE_META, canonicalUrl } from './page-meta.data';
import { buildGraph } from './structured-data.graphs';
import { StructuredDataService } from './structured-data.service';

/**
 * Writes one route's head: title, meta tags, canonical and JSON-LD. Runs at prerender and on
 * every client navigation; tags are updated in place, so there is never a second copy.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly structuredData = inject(StructuredDataService);

  applyPage(pageId: PageId): void {
    const meta = PAGE_META[pageId];
    const canonical = canonicalUrl(meta);

    this.titleService.setTitle(meta.title);
    this.updateTags(buildMetaTags(meta, canonical));
    this.updateTags(buildVerificationTags(GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION));
    this.updateCanonical(canonical);
    this.structuredData.apply(buildGraph(pageId));
  }

  private updateTags(tags: readonly MetaDefinition[]): void {
    for (const tag of tags) {
      this.metaService.updateTag(tag);
    }
  }

  private updateCanonical(canonical: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }
}

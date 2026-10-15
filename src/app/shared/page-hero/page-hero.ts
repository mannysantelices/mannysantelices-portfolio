import { Component, OnInit, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeroPreloadService } from '../../core/media/hero-preload.service';
import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { PAGE_META } from '../../core/seo/page-meta.data';
import {
  HERO_IMAGES,
  HERO_IMAGE_SIZES,
  HeroImage,
  heroFallbackSrc,
  heroSrcset,
} from '../../core/site/hero-images.data';
import { HOME_LINK } from '../../core/site/nav.data';
import { BOOK_CALL_FRAGMENT } from '../../core/site/site.config';
import { HeroCopy } from '../content.model';

/**
 * The hero every page starts with: breadcrumb (not on home), the one `h1`, lede, two buttons,
 * then the page's image (text first in reading order).
 */
@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  templateUrl: './page-hero.html',
})
export class PageHero implements OnInit {
  private readonly heroPreload = inject(HeroPreloadService);

  readonly copy = input.required<HeroCopy>();

  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly contactFragment = BOOK_CALL_FRAGMENT;
  protected readonly homeLink = HOME_LINK;
  /** Same label as the breadcrumb in the JSON-LD; `null` on the home page, which has no trail. */
  protected readonly breadcrumbLabel = computed<string | null>(() => {
    const pageId = this.copy().pageId;
    if (pageId === 'home') {
      return null;
    }
    return PAGE_META[pageId].breadcrumbLabel;
  });
  protected readonly image = computed<HeroImage>(() => HERO_IMAGES[this.copy().pageId]);
  protected readonly webpSrcset = computed<string>(() => heroSrcset(this.image(), 'webp'));
  protected readonly jpegSrcset = computed<string>(() => heroSrcset(this.image(), 'jpg'));
  protected readonly fallbackSrc = computed<string>(() => heroFallbackSrc(this.image()));
  protected readonly sizes = HERO_IMAGE_SIZES;

  ngOnInit(): void {
    this.heroPreload.apply(this.image());
  }
}

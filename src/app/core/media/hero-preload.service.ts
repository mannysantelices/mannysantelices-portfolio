import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { HERO_IMAGE_SIZES, HeroImage, heroSrcset } from '../site/hero-images.data';

const PRELOAD_SELECTOR: string = 'link[rel="preload"][data-hero-image]';

/**
 * Keeps one `<link rel="preload" as="image">` for the current route's hero in the head. Written at
 * prerender, so the browser starts the hero download before the stylesheet and script arrive.
 */
@Injectable({ providedIn: 'root' })
export class HeroPreloadService {
  private readonly document = inject(DOCUMENT);

  apply(image: HeroImage): void {
    const link = this.findOrCreateLink();
    link.setAttribute('imagesrcset', heroSrcset(image, 'webp'));
    link.setAttribute('imagesizes', HERO_IMAGE_SIZES);
  }

  private findOrCreateLink(): HTMLLinkElement {
    const head = this.document.head;
    const existing = head.querySelector<HTMLLinkElement>(PRELOAD_SELECTOR);
    if (existing) {
      return existing;
    }
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'image');
    link.setAttribute('type', 'image/webp');
    link.setAttribute('fetchpriority', 'high');
    link.setAttribute('data-hero-image', '');
    head.appendChild(link);
    return link;
  }
}

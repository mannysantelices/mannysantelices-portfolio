import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { buildVerificationTags } from './meta-tags.builder';
import { PAGE_META, canonicalUrl } from './page-meta.data';
import { SeoService } from './seo.service';

const JSON_LD_SELECTOR: string = 'script[type="application/ld+json"]';
const HEAD_SELECTORS: readonly string[] = [
  'title',
  'meta[name="description"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:url"]',
  'meta[property="og:image"]',
  'meta[property="og:site_name"]',
  'meta[name="twitter:card"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
  JSON_LD_SELECTOR,
];

describe('SeoService', () => {
  let head: HTMLHeadElement;
  let service: SeoService;

  function contentOf(selector: string): string | null {
    return head.querySelector(selector)?.getAttribute('content') ?? null;
  }

  beforeEach(() => {
    service = TestBed.inject(SeoService);
    head = TestBed.inject(DOCUMENT).head;
  });

  it('writes the page title, description, canonical and Open Graph URL', () => {
    const about = PAGE_META.about;

    service.applyPage('about');

    expect(TestBed.inject(DOCUMENT).title).toBe(about.title);
    expect(contentOf('meta[name="description"]')).toBe(about.description);
    expect(contentOf('meta[property="og:url"]')).toBe(canonicalUrl(about));
    expect(contentOf('meta[property="og:title"]')).toBe(about.title);
    expect(contentOf('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      canonicalUrl(about),
    );
  });

  it('keeps exactly one of each head tag after several navigations', () => {
    service.applyPage('home');
    service.applyPage('website-creation');
    service.applyPage('about');

    for (const selector of HEAD_SELECTORS) {
      expect(head.querySelectorAll(selector).length, selector).toBe(1);
    }
  });

  it('replaces the JSON-LD with the current page, as parseable JSON', () => {
    service.applyPage('about');
    service.applyPage('website-improvement');

    const json = head.querySelector(JSON_LD_SELECTOR)?.textContent ?? '';
    const parsed = JSON.parse(json) as { '@graph': { '@type': string }[] };
    const types = parsed['@graph'].map((node: { '@type': string }) => node['@type']);

    expect(types).toContain('Service');
    expect(types).not.toContain('Person');
  });

  it('emits no search-engine verification tag while the values are empty', () => {
    service.applyPage('home');

    expect(head.querySelector('meta[name="google-site-verification"]')).toBeNull();
    expect(head.querySelector('meta[name="msvalidate.01"]')).toBeNull();
  });
});

describe('buildVerificationTags', () => {
  it('returns nothing for empty values', () => {
    expect(buildVerificationTags('', '')).toEqual([]);
  });

  it('returns one tag per supplied value', () => {
    expect(buildVerificationTags('google-value', 'bing-value')).toEqual([
      { name: 'google-site-verification', content: 'google-value' },
      { name: 'msvalidate.01', content: 'bing-value' },
    ]);
  });
});

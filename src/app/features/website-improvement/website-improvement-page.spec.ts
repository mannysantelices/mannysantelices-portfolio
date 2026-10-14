import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';

const TIER_NAMES: readonly string[] = ['Basic', 'Professional', 'Enterprise'];
const PRICE_PATTERN: RegExp = /[$£€¥₱]\s?\d|\bper (hour|day|month)\b/i;

describe('WebsiteImprovementPage', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create('/website-improvement');
    page = harness.routeNativeElement as HTMLElement;
  });

  it('names the three tiers in order, each in a heading', () => {
    const headings = Array.from(page.querySelectorAll('.tier-card h3'));
    const names = headings.map((heading: Element) => heading.textContent);

    expect(names).toEqual([...TIER_NAMES]);
  });

  it('gives each tier four scope items and a typical time', () => {
    const cards = Array.from(page.querySelectorAll('.tier-card'));

    expect(cards.length).toBe(TIER_NAMES.length);
    for (const card of cards) {
      expect(card.querySelectorAll('.tier-scope li').length).toBe(4);
      expect(card.querySelector('.tier-time')?.textContent).toContain('Typically');
    }
  });

  it('shows the care plan response times and no working hours or time zone', () => {
    const care = page.querySelector('#care')?.textContent ?? '';

    expect(care).toContain('We respond within 1 business day.');
    expect(care).toContain('We respond within 2 business days and finish within 5.');
    expect(page.textContent?.toLowerCase()).not.toContain('time zone');
    expect(page.textContent).not.toContain('business hours');
  });

  it('gives the Website Snapshot card the anchor its structured data points at', () => {
    expect(page.querySelector('#start #website-snapshot h3')?.textContent).toContain(
      'Website Snapshot',
    );
  });

  it('shows no price', () => {
    expect(page.textContent).not.toMatch(PRICE_PATTERN);
  });

  it('links every tier and the between-tiers note to the contact section of this page', () => {
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>('#tiers a'));
    const hrefs = links.map((link: HTMLAnchorElement) => link.getAttribute('href'));

    expect(hrefs.length).toBe(TIER_NAMES.length + 1);
    for (const href of hrefs) {
      expect(href).toBe('/website-improvement#contact');
    }
  });
});

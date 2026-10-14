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

  it('says who each tier is for under a label that says so', () => {
    const cards = Array.from(page.querySelectorAll('.tier-card'));

    expect(cards.length).toBe(TIER_NAMES.length);
    for (const card of cards) {
      expect(card.querySelector('dt')?.textContent).toBe('Who it is for');
      expect(card.querySelector('dd')?.textContent?.length).toBeGreaterThan(0);
    }
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

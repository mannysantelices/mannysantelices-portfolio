import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { FOUNDER } from '../../core/site/founder.data';
import { SERVICES } from '../../core/site/services.data';

const CREDENTIAL_PATTERN: RegExp = /AWS Certified Developer/g;

describe('AboutPage', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create('/about');
    page = harness.routeNativeElement as HTMLElement;
  });

  it('names the founder and every fact the structured data states about them', () => {
    expect(page.textContent).toContain(FOUNDER.name);
    expect(page.textContent?.toLowerCase()).toContain('founder');
    for (const topic of FOUNDER.knowsAbout) {
      expect(page.textContent?.toLowerCase()).toContain(topic.toLowerCase());
    }
  });

  it('states the certification once, as text and not as a link', () => {
    const matches = page.textContent?.match(CREDENTIAL_PATTERN) ?? [];

    expect(matches.length).toBe(1);
    expect(page.querySelector('.credential a')).toBeNull();
  });

  it('has one tools list in which no tool appears twice', () => {
    const chips = Array.from(page.querySelectorAll('li.chip'));
    const names = chips.map((chip: Element) => chip.textContent?.toLowerCase());

    expect(page.querySelectorAll('.stack').length).toBe(1);
    expect(names.length).toBeGreaterThan(0);
    expect(new Set(names).size).toBe(names.length);
  });

  it('links to all three services', () => {
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>('#related h3 a'));

    expect(links.length).toBe(SERVICES.length);
  });

  it('uses h3 for tools rows and never skips to h4', () => {
    expect(page.querySelectorAll('#tools h3').length).toBeGreaterThan(0);
    expect(page.querySelectorAll('h4').length).toBe(0);
  });
});

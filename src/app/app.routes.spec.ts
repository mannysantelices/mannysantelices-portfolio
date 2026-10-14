import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';

interface RouteExpectation {
  readonly url: string;
  readonly heading: string;
}

const EXPECTED_ROUTES: readonly RouteExpectation[] = [
  { url: '/', heading: 'DevSecOps consulting on AWS' },
  { url: '/website-creation', heading: 'Website creation' },
  { url: '/website-improvement', heading: 'Website improvement' },
  { url: '/devsecops-consulting', heading: 'DevSecOps consulting' },
  { url: '/about', heading: 'About Santelices Systems' },
];

describe('routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  for (const expected of EXPECTED_ROUTES) {
    it(`renders one h1 at ${expected.url}`, async () => {
      const harness = await RouterTestingHarness.create(expected.url);
      const element = harness.routeNativeElement as HTMLElement;
      const headings = element.querySelectorAll('h1');

      expect(headings.length).toBe(1);
      expect(headings[0].textContent).toContain(expected.heading);
    });

    it(`has no skipped heading level and no bare fragment link at ${expected.url}`, async () => {
      const harness = await RouterTestingHarness.create(expected.url);
      const element = harness.routeNativeElement as HTMLElement;

      expect(element.querySelectorAll('h2').length).toBeGreaterThan(0);
      expect(element.querySelectorAll('h4, h5, h6').length).toBe(0);
      expect(element.querySelectorAll('a[href^="#"]').length).toBe(0);
    });
  }
});

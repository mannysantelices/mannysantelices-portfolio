import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { SERVICES, ServiceSummary } from '../../core/site/services.data';
import { HomePage } from './home-page';

describe('HomePage', () => {
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture: ComponentFixture<HomePage> = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  it('has one h1 that names websites and AWS, and no breadcrumb', () => {
    const headings = page.querySelectorAll('h1');

    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain('websites');
    expect(headings[0].textContent).toContain('AWS');
    expect(page.querySelector('nav[aria-label="Breadcrumb"]')).toBeNull();
  });

  it('shows the sections in order: services, start, how we work, work, about teaser', () => {
    const sectionIds = Array.from(page.querySelectorAll('section[id]')).map(
      (section: Element) => section.id,
    );

    expect(sectionIds).toEqual(['services', 'start', 'how-we-work', 'work', 'about-teaser']);
  });

  it('links each service heading to its route, in display order', () => {
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>('#services h3 a'));
    const hrefs = links.map((link: HTMLAnchorElement) => link.getAttribute('href'));
    const names = links.map((link: HTMLAnchorElement) => link.textContent);

    expect(hrefs).toEqual(SERVICES.map((service: ServiceSummary) => `/${service.path}`));
    expect(names).toEqual(SERVICES.map((service: ServiceSummary) => service.name));
  });

  it('shows each service summary exactly as the structured data states it', () => {
    for (const service of SERVICES) {
      expect(page.textContent).toContain(service.summary);
    }
  });

  it('has no tools list and no bare fragment link', () => {
    expect(page.querySelectorAll('.chip').length).toBe(0);
    expect(page.querySelectorAll('a[href^="#"]').length).toBe(0);
  });

  it('points both hero buttons at sections of the home page', () => {
    const buttons = Array.from(page.querySelectorAll<HTMLAnchorElement>('.hero-actions a'));
    const hrefs = buttons.map((button: HTMLAnchorElement) => button.getAttribute('href'));

    expect(hrefs).toEqual(['/#contact', '/#services']);
  });
});

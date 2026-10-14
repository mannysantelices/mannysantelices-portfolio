import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { BUSINESS_NAME } from '../../core/site/site.config';
import { SiteHeader } from './site-header';
import { splitWordmark } from './wordmark';

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let host: HTMLElement;

  function menuButton(): HTMLButtonElement {
    const button = host.querySelector<HTMLButtonElement>('.nav-toggle');
    if (!button) {
      throw new Error('No menu button');
    }
    return button;
  }

  function isMenuOpen(): boolean {
    return host.querySelector('.nav-menu')?.classList.contains('open') ?? false;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter(routes)],
    }).compileComponents();
    fixture = TestBed.createComponent(SiteHeader);
    host = fixture.nativeElement as HTMLElement;
    document.body.appendChild(host);
    await fixture.whenStable();
  });

  afterEach(() => {
    host.remove();
  });

  it('shows the business name as a text wordmark that links home, with no image', () => {
    const wordmark = host.querySelector<HTMLAnchorElement>('.nav-mark');

    expect(wordmark?.textContent?.trim()).toBe(BUSINESS_NAME);
    expect(wordmark?.getAttribute('href')).toBe('/');
    expect(host.querySelector('img, picture')).toBeNull();
  });

  it('links to the three services and the about page, then the contact control', () => {
    const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('.nav-links a'));
    const hrefs = links.map((link: HTMLAnchorElement) => link.getAttribute('href'));

    expect(hrefs).toEqual([
      '/website-creation',
      '/website-improvement',
      '/devsecops-consulting',
      '/about',
    ]);
    expect(host.querySelector('.nav-cta')?.getAttribute('href')).toBe('/#contact');
  });

  it('opens and closes the menu from the button and reports the state', async () => {
    menuButton().click();
    await fixture.whenStable();
    expect(isMenuOpen()).toBe(true);
    expect(menuButton().getAttribute('aria-expanded')).toBe('true');

    menuButton().click();
    await fixture.whenStable();
    expect(isMenuOpen()).toBe(false);
    expect(menuButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the menu on Escape and returns focus to the menu button', async () => {
    menuButton().click();
    await fixture.whenStable();
    const firstLink = host.querySelector<HTMLAnchorElement>('.nav-links a');
    firstLink?.focus();

    firstLink?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();

    expect(isMenuOpen()).toBe(false);
    expect(document.activeElement).toBe(menuButton());
  });

  it('closes the menu on a pointer press outside the header', async () => {
    menuButton().click();
    await fixture.whenStable();

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await fixture.whenStable();

    expect(isMenuOpen()).toBe(false);
  });

  it('never serves the inert attribute: without script it would disable the navigation', () => {
    expect(host.querySelector('.nav-menu')?.hasAttribute('inert')).toBe(false);
  });
});

describe('splitWordmark', () => {
  it('splits the business name after its first word', () => {
    expect(splitWordmark('Santelices Systems')).toEqual({ first: 'Santelices', rest: 'Systems' });
  });
});

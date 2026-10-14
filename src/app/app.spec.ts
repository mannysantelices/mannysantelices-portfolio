import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';
import { EmailJsAdapter } from './features/contact/emailjs.adapter';

describe('App shell', () => {
  let shell: HTMLElement;

  beforeEach(async () => {
    const sendForm = vi.fn<(form: HTMLFormElement) => Promise<void>>();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), { provide: EmailJsAdapter, useValue: { sendForm } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/about');
    await fixture.whenStable();
    shell = fixture.nativeElement as HTMLElement;
  });

  it('has exactly one header, one main and one footer', () => {
    expect(shell.querySelectorAll('header').length).toBe(1);
    expect(shell.querySelectorAll('main').length).toBe(1);
    expect(shell.querySelectorAll('footer').length).toBe(1);
  });

  it('keeps the footer outside main and the contact section inside it', () => {
    const main = shell.querySelector('main');

    expect(main?.querySelector('footer')).toBeNull();
    expect(main?.querySelector('section#contact')).not.toBeNull();
    expect(main?.id).toBe('main');
    expect(main?.getAttribute('tabindex')).toBe('-1');
  });

  it('starts with a skip link to main on the current route', () => {
    const first = shell.firstElementChild;

    expect(first?.classList.contains('skip-link')).toBe(true);
    expect(first?.textContent).toBe('Skip to content');
    expect(first?.getAttribute('href')).toBe('/about#main');
  });

  it('gives the header and footer contact links the current route, never a bare fragment', () => {
    const contactLinks = Array.from(shell.querySelectorAll<HTMLAnchorElement>('a[href$="#contact"]'));
    const hrefs = contactLinks.map((link: HTMLAnchorElement) => link.getAttribute('href'));

    expect(hrefs.length).toBeGreaterThanOrEqual(2);
    for (const href of hrefs) {
      expect(href).toBe('/about#contact');
    }
  });
});

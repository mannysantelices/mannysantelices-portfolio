import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RichText } from './rich-text';

describe('RichText', () => {
  it('renders text, bold lead-ins and router links in order, keeping spaces', async () => {
    await TestBed.configureTestingModule({
      imports: [RichText],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture: ComponentFixture<RichText> = TestBed.createComponent(RichText);
    fixture.componentRef.setInput('segments', [
      { strong: 'Lead.' },
      ' Then ',
      { link: 'a link', path: '/about', fragment: 'remote' },
      '.',
    ]);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent).toBe('Lead. Then a link.');
    expect(host.querySelector('strong')?.textContent).toBe('Lead.');
    expect(host.querySelector('a')?.getAttribute('href')).toBe('/about#remote');
  });
});

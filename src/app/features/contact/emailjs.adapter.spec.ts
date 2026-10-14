import { TestBed } from '@angular/core/testing';

import { EMAILJS_LOADER, EmailJsAdapter } from './emailjs.adapter';

/** Nothing here reaches EmailJS: the loader is replaced. */
describe('EmailJsAdapter', () => {
  it('does not load the mail library when created', () => {
    const loader = vi.fn();
    TestBed.configureTestingModule({ providers: [{ provide: EMAILJS_LOADER, useValue: loader }] });

    TestBed.inject(EmailJsAdapter);

    expect(loader).not.toHaveBeenCalled();
  });

  it('turns a library load failure (blocked storage) into a rejected send', async () => {
    const loader = vi.fn(async () => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    });
    TestBed.configureTestingModule({ providers: [{ provide: EMAILJS_LOADER, useValue: loader }] });
    const adapter = TestBed.inject(EmailJsAdapter);

    await expect(adapter.sendForm(document.createElement('form'))).rejects.toThrow();
  });
});

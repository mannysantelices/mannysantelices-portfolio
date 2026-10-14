import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactForm } from './contact-form';
import { BOT_TRAP_NAME } from './contact-form.model';
import { EmailJsAdapter } from './emailjs.adapter';

type TextControl = HTMLInputElement | HTMLTextAreaElement;

/** Nothing in this file reaches EmailJS: the adapter is replaced by a mock. */
describe('ContactForm', () => {
  const sendForm = vi.fn<(form: HTMLFormElement) => Promise<void>>();
  let fixture: ComponentFixture<ContactForm>;
  let host: HTMLElement;

  function control(fieldName: string): TextControl {
    const element = host.querySelector<TextControl>(`[name="${fieldName}"]`);
    if (!element) {
      throw new Error(`No control named "${fieldName}"`);
    }
    return element;
  }

  function fillValidValues(): void {
    control('name').value = 'Test Person';
    control('email').value = 'person@example.test';
    control('message').value = 'A test message.';
  }

  async function submit(): Promise<void> {
    const form = host.querySelector('form');
    form?.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    sendForm.mockReset();
    sendForm.mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [provideRouter([]), { provide: EmailJsAdapter, useValue: { sendForm } }],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactForm);
    host = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('renders labelled, required, length-limited fields', () => {
    expect(control('name').maxLength).toBe(100);
    expect(control('email').maxLength).toBe(254);
    expect(control('message').maxLength).toBe(4000);
    for (const fieldName of ['name', 'email', 'message']) {
      expect(control(fieldName).required, fieldName).toBe(true);
      expect(host.querySelector(`label[for="${control(fieldName).id}"]`), fieldName).not.toBeNull();
    }
  });

  it('renders the bot trap out of reach, under a name browsers do not autofill', () => {
    const trap = control(BOT_TRAP_NAME);

    expect(BOT_TRAP_NAME).toBe('hp_k7q');
    expect(trap.getAttribute('tabindex')).toBe('-1');
    expect(trap.getAttribute('autocomplete')).toBe('off');
    expect(trap.parentElement?.getAttribute('aria-hidden')).toBe('true');
  });

  it('never submits to a URL: the form method keeps typed values out of the address bar', () => {
    const form = host.querySelector('form');

    expect(form?.getAttribute('method')).toBe('dialog');
    expect(form?.hasAttribute('action')).toBe(false);
  });

  it('has empty status and alert regions from the first render', () => {
    expect(host.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
    expect(host.querySelector('[role="alert"]')?.textContent?.trim()).toBe('');
  });

  it('shows a message per empty field, marks it invalid and sends nothing', async () => {
    await submit();

    expect(sendForm).not.toHaveBeenCalled();
    expect(host.querySelectorAll('.field-error').length).toBe(3);
    expect(control('name').getAttribute('aria-invalid')).toBe('true');
    expect(control('name').getAttribute('aria-describedby')).toBe('cf-name-err');
    expect(document.activeElement).toBe(control('name'));
  });

  it('shows the success message in the status region and removes the fields', async () => {
    fillValidValues();
    await submit();

    const status = host.querySelector<HTMLElement>('[role="status"]');
    expect(sendForm).toHaveBeenCalledTimes(1);
    expect(status?.textContent).toContain('Your message was sent');
    expect(host.querySelector<HTMLElement>('.form-fields')?.hidden).toBe(true);
  });

  it('shows the alert with a mailto link and keeps the typed values when the send fails', async () => {
    sendForm.mockRejectedValueOnce(new Error('network'));
    fillValidValues();
    await submit();

    const alert = host.querySelector<HTMLElement>('[role="alert"]');
    const fallbackHref = alert?.querySelector('a')?.getAttribute('href') ?? '';
    expect(alert?.textContent).toContain('Your message was not sent');
    expect(fallbackHref.startsWith('mailto:')).toBe(true);
    expect(control('name').value).toBe('Test Person');
    expect(control('message').value).toBe('A test message.');
    expect(host.querySelector<HTMLElement>('.form-fields')?.hidden).toBe(false);
  });

  it('sends nothing when the bot trap is filled', async () => {
    fillValidValues();
    control(BOT_TRAP_NAME).value = 'filled by a bot';
    await submit();

    expect(sendForm).not.toHaveBeenCalled();
    expect(host.querySelector('[role="alert"]')?.textContent).toContain('not sent');
  });
});

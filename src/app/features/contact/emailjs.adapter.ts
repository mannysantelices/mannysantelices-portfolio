import { Injectable, InjectionToken, inject } from '@angular/core';

// EmailJS keys are public by design (client-side send, rate-limited per account) — safe to ship in the bundle.
const EMAILJS_SERVICE_ID = 'service_lv1kk7h';
const EMAILJS_TEMPLATE_ID = 'template_xrvhifc';
const EMAILJS_PUBLIC_KEY = '-5ERXyNbq1UevCa8i';

type EmailJsLibrary = typeof import('@emailjs/browser').default;

/**
 * Loads `@emailjs/browser` on first send, never at startup: the library reads localStorage when
 * it is evaluated, and blocked storage then throws. Loaded lazily, that failure only fails the send.
 */
export const EMAILJS_LOADER = new InjectionToken<() => Promise<EmailJsLibrary>>('EMAILJS_LOADER', {
  providedIn: 'root',
  factory: () => async (): Promise<EmailJsLibrary> => {
    const library = await import('@emailjs/browser');
    return library.default;
  },
});

/** The only file that imports `@emailjs/browser`. Tests replace this class; nothing else sends. */
@Injectable({ providedIn: 'root' })
export class EmailJsAdapter {
  private readonly loadLibrary = inject(EMAILJS_LOADER);

  /** The mail template reads the form fields named `name`, `email` and `message`. */
  async sendForm(form: HTMLFormElement): Promise<void> {
    const emailjs: EmailJsLibrary = await this.loadLibrary();
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
      publicKey: EMAILJS_PUBLIC_KEY,
    });
  }
}

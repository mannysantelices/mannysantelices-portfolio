import { Injectable, inject, signal } from '@angular/core';

import { CONTACT_COPY } from './contact.copy';
import { ContactFieldErrors, ContactValues, SendState } from './contact-form.model';
import { EmailJsAdapter } from './emailjs.adapter';

function isBlank(value: string): boolean {
  return value.trim() === '';
}

/** The browser accepts `a@b`; a reply needs a domain with a dot that is not at either end. */
function hasDottedDomain(email: string): boolean {
  const domain = email.trim().slice(email.trim().lastIndexOf('@') + 1);
  const dotIndex = domain.indexOf('.');
  return dotIndex > 0 && !domain.endsWith('.');
}

/** The contact form's rules: what is valid, when a send happens, and the state that follows. */
@Injectable()
export class ContactFormService {
  private readonly adapter = inject(EmailJsAdapter);

  readonly state = signal<SendState>('idle');

  /** `hasEmailTypeMismatch` is the browser's own verdict (`validity.typeMismatch`). */
  validate(values: ContactValues, hasEmailTypeMismatch: boolean): ContactFieldErrors {
    const errors: Partial<Record<keyof ContactValues, string>> = {};
    if (isBlank(values.name)) {
      errors.name = CONTACT_COPY.errName;
    }
    if (isBlank(values.email)) {
      errors.email = CONTACT_COPY.errEmailEmpty;
    } else if (hasEmailTypeMismatch || !hasDottedDomain(values.email)) {
      errors.email = CONTACT_COPY.errEmailFormat;
    }
    if (isBlank(values.message)) {
      errors.message = CONTACT_COPY.errMessage;
    }
    return errors;
  }

  /**
   * Sends once. A filled bot trap sends nothing and shows the error state, not a fake success:
   * a person whose browser filled the field still gets the email link.
   */
  async send(form: HTMLFormElement, botTrapValue: string): Promise<void> {
    const current = this.state();
    if (current === 'sending' || current === 'sent') {
      return;
    }
    if (botTrapValue !== '') {
      this.state.set('error');
      return;
    }
    // Leaving the error state empties the alert, so a repeated failure is announced again.
    this.state.set('sending');
    try {
      await this.adapter.sendForm(form);
      this.state.set('sent');
    } catch {
      this.state.set('error');
    }
  }

  reset(): void {
    this.state.set('idle');
  }
}

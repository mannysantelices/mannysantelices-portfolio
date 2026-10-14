import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { CONTACT_EMAIL } from '../../core/site/site.config';
import { CONTACT_COPY } from './contact.copy';
import {
  focusFirstInvalid,
  hasEmailTypeMismatch,
  readBotTrap,
  readValues,
} from './contact-form.dom';
import { ContactField, ContactFieldErrors } from './contact-form.model';
import { ContactFormService } from './contact-form.service';

/** The enquiry form: template state and focus movement only. Rules live in the service. */
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  providers: [ContactFormService],
})
export class ContactForm {
  private readonly service = inject(ContactFormService);
  private readonly injector = inject(Injector);
  private readonly currentPath = inject(CurrentRouteService).path;
  private readonly formElement = viewChild.required<ElementRef<HTMLFormElement>>('form');
  private readonly statusRegion = viewChild.required<ElementRef<HTMLElement>>('statusRegion');

  protected readonly mailtoHref = `mailto:${CONTACT_EMAIL}`;
  protected readonly errors = signal<ContactFieldErrors>({});
  /** Native validation works until the script runs; then the form validates itself. */
  protected readonly isHydrated = signal<boolean>(false);
  protected readonly isSending = computed<boolean>(() => this.service.state() === 'sending');
  protected readonly isSent = computed<boolean>(() => this.service.state() === 'sent');
  protected readonly hasFailed = computed<boolean>(() => this.service.state() === 'error');
  protected readonly submitLabel = computed<string>(() => {
    return this.isSending() ? CONTACT_COPY.sending : CONTACT_COPY.submit;
  });

  constructor() {
    afterNextRender(() => this.isHydrated.set(true));
    effect(() => {
      this.currentPath();
      untracked(() => this.startAfreshAfterSent());
    });
  }

  protected async onSubmit(event: Event, form: HTMLFormElement): Promise<void> {
    event.preventDefault();
    const errors = this.service.validate(readValues(form), hasEmailTypeMismatch(form));
    this.errors.set(errors);
    if (Object.keys(errors).length > 0) {
      focusFirstInvalid(form, errors);
      return;
    }
    await this.service.send(form, readBotTrap(form));
    if (this.isSent()) {
      this.focusStatusOnceRendered();
    }
  }

  protected clearError(field: ContactField): void {
    this.errors.update((current: ContactFieldErrors): ContactFieldErrors => {
      return { ...current, [field]: undefined };
    });
  }

  private focusStatusOnceRendered(): void {
    // The success text is inserted first, then focus moves to the status region.
    afterNextRender(() => this.statusRegion().nativeElement.focus(), { injector: this.injector });
  }

  /** The sent state lasts until a reload or a move to another route (design spec 6.5). */
  private startAfreshAfterSent(): void {
    if (!this.isSent()) {
      return;
    }
    this.formElement().nativeElement.reset();
    this.service.reset();
  }
}

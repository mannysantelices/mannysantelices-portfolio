import { TestBed } from '@angular/core/testing';

import { CONTACT_COPY } from './contact.copy';
import { ContactValues } from './contact-form.model';
import { ContactFormService } from './contact-form.service';
import { EmailJsAdapter } from './emailjs.adapter';

const VALID_VALUES: ContactValues = {
  name: 'Test Person',
  email: 'person@example.test',
  message: 'A test message.',
};

/** Nothing in this file reaches EmailJS: the adapter is replaced by a mock. */
describe('ContactFormService', () => {
  const sendForm = vi.fn<(form: HTMLFormElement) => Promise<void>>();
  let service: ContactFormService;
  let form: HTMLFormElement;

  beforeEach(() => {
    sendForm.mockReset();
    sendForm.mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [ContactFormService, { provide: EmailJsAdapter, useValue: { sendForm } }],
    });
    service = TestBed.inject(ContactFormService);
    form = document.createElement('form');
  });

  it('accepts complete values', () => {
    expect(service.validate(VALID_VALUES, false)).toEqual({});
  });

  it('reports every blank field, counting spaces as blank', () => {
    const errors = service.validate({ name: '  ', email: '', message: '\n' }, false);

    expect(errors).toEqual({
      name: CONTACT_COPY.errName,
      email: CONTACT_COPY.errEmailEmpty,
      message: CONTACT_COPY.errMessage,
    });
  });

  it('reports an email the browser rejects', () => {
    const errors = service.validate({ ...VALID_VALUES, email: 'not-an-email' }, true);

    expect(errors).toEqual({ email: CONTACT_COPY.errEmailFormat });
  });

  it('reports an email whose domain has no dot', () => {
    const errors = service.validate({ ...VALID_VALUES, email: 'a@b' }, false);

    expect(errors).toEqual({ email: CONTACT_COPY.errEmailFormat });
  });

  it('reports an email whose domain dot is at an end', () => {
    expect(service.validate({ ...VALID_VALUES, email: 'a@b.' }, false)).toEqual({
      email: CONTACT_COPY.errEmailFormat,
    });
    expect(service.validate({ ...VALID_VALUES, email: 'a@.b' }, false)).toEqual({
      email: CONTACT_COPY.errEmailFormat,
    });
  });

  it('sends once and ends in the sent state', async () => {
    await service.send(form, '');

    expect(sendForm).toHaveBeenCalledTimes(1);
    expect(sendForm).toHaveBeenCalledWith(form);
    expect(service.state()).toBe('sent');
  });

  it('does not send a second time after success', async () => {
    await service.send(form, '');
    await service.send(form, '');

    expect(sendForm).toHaveBeenCalledTimes(1);
  });

  it('ends in the error state when the send fails, and allows a retry', async () => {
    sendForm.mockRejectedValueOnce(new Error('network'));

    await service.send(form, '');
    expect(service.state()).toBe('error');

    await service.send(form, '');
    expect(sendForm).toHaveBeenCalledTimes(2);
    expect(service.state()).toBe('sent');
  });

  it('sends nothing and shows the error state when the bot trap is filled', async () => {
    await service.send(form, 'filled by a bot');

    expect(sendForm).not.toHaveBeenCalled();
    expect(service.state()).toBe('error');
  });
});

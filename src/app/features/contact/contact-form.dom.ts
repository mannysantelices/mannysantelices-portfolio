import {
  BOT_TRAP_NAME,
  CONTACT_FIELDS,
  ContactField,
  ContactFieldErrors,
  ContactValues,
} from './contact-form.model';

function textValue(data: FormData, fieldName: string): string {
  const value = data.get(fieldName);
  return typeof value === 'string' ? value : '';
}

export function readValues(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  return {
    name: textValue(data, 'name'),
    email: textValue(data, 'email'),
    message: textValue(data, 'message'),
  };
}

export function readBotTrap(form: HTMLFormElement): string {
  return textValue(new FormData(form), BOT_TRAP_NAME);
}

function fieldElement(form: HTMLFormElement, field: ContactField): HTMLElement | null {
  return form.querySelector<HTMLElement>(`#cf-${field}`);
}

export function hasEmailTypeMismatch(form: HTMLFormElement): boolean {
  const input = fieldElement(form, 'email');
  return input instanceof HTMLInputElement && input.validity.typeMismatch;
}

export function focusFirstInvalid(form: HTMLFormElement, errors: ContactFieldErrors): void {
  const firstInvalid = CONTACT_FIELDS.find((field: ContactField) => errors[field] !== undefined);
  if (firstInvalid) {
    fieldElement(form, firstInvalid)?.focus();
  }
}

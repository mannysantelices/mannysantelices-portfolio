export type SendState = 'idle' | 'sending' | 'sent' | 'error';

export type ContactField = 'name' | 'email' | 'message';

export interface ContactValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

/** One message per invalid field; a valid field has no entry. */
export type ContactFieldErrors = Readonly<Partial<Record<ContactField, string>>>;

/** Validation order, which is also the focus order on a failed submit. */
export const CONTACT_FIELDS: readonly ContactField[] = ['name', 'email', 'message'];

/** Name of the bot-trap input in `contact-form.html`. Not a word that browsers autofill. */
export const BOT_TRAP_NAME: string = 'hp_k7q';

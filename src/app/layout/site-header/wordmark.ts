export interface Wordmark {
  readonly first: string;
  readonly rest: string;
}

/** Splits the business name after its first word; the two parts are styled differently. */
export function splitWordmark(businessName: string): Wordmark {
  const [first, ...others] = businessName.split(' ');
  return { first, rest: others.join(' ') };
}

import { SITE_URL } from '../site/site.config';

export type JsonLdNode = Readonly<Record<string, unknown>>;

export interface JsonLdGraph {
  readonly '@context': string;
  readonly '@graph': readonly JsonLdNode[];
}

/** Stable ids. Do not change them between releases (search spec 3.1). */
export const ORGANIZATION_ID: string = `${SITE_URL}#organization`;
export const WEBSITE_ID: string = `${SITE_URL}#website`;
export const PERSON_ID: string = `${SITE_URL}about/#person`;

export function serviceId(canonical: string): string {
  return `${canonical}#service`;
}

export function webPageId(canonical: string): string {
  return `${canonical}#webpage`;
}

export function breadcrumbId(canonical: string): string {
  return `${canonical}#breadcrumb`;
}

export function reference(id: string): JsonLdNode {
  return { '@id': id };
}

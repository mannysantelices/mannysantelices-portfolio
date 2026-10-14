import { PageId } from '../site/page-id';

export interface PageMeta {
  readonly id: PageId;
  /** Router path without slashes; empty for the home page. */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  /** Name of the page in the breadcrumb trail and its JSON-LD. */
  readonly breadcrumbLabel: string;
}

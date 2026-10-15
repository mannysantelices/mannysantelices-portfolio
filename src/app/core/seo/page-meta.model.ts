import { PageId } from '../site/page-id';

export interface PageMeta {
  readonly id: PageId;
  /** Router path without slashes; empty for the home page. */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  /** Name of the page in the breadcrumb trail and its JSON-LD. */
  readonly breadcrumbLabel: string;
  /** `og:type`; `website` when absent. */
  readonly ogType?: 'website' | 'article';
  /** `YYYY-MM-DD`; only on an article. Feeds `article:published_time` and the JSON-LD dates. */
  readonly publishedDate?: string;
  /** Article only: the visible `h1` and the JSON-LD `headline`, typed once. */
  readonly headline?: string;
}

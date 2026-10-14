import { PageId } from '../core/site/page-id';

/** Wording for the hero every page starts with. Text comes from marketing's copy deck. */
export interface HeroCopy {
  readonly pageId: PageId;
  readonly h1: string;
  readonly lede: string;
  readonly primaryLabel: string;
  readonly secondaryLabel: string;
  /** Section id on the same page that the secondary button scrolls to. */
  readonly secondaryFragment: string;
}

/** A page section's id and heading block. */
export interface SectionCopy {
  readonly id: string;
  readonly heading: string;
  readonly tag?: string;
  readonly note?: string;
}

/** A card with a heading and either one paragraph, a short list of points, or both. */
export interface ContentCard {
  readonly title: string;
  readonly body?: string;
  readonly points?: readonly string[];
}

export interface Step {
  readonly title: string;
  readonly body: string;
}

export type CardColumns = 2 | 3;

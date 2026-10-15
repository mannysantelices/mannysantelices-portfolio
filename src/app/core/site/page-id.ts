/** One id per route. Route data carries it so shared services can look a page up. */
export type PageId =
  | 'home'
  | 'website-creation'
  | 'website-improvement'
  | 'devsecops-consulting'
  | 'about'
  | 'case-study-own-site';

/** Pages that open with the shared image hero. The case study has a text-only hero. */
export type HeroPageId = Exclude<PageId, 'case-study-own-site'>;

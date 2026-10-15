import { IMPROVEMENT_TIER_NAMES } from './services.data';

export interface ImprovementTier {
  readonly name: string;
  /** Who the tier is for (`improve.tiers.*.for`). */
  readonly summary: string;
  /** Four typical scope items (`improve.tiers.*.item1-4`). */
  readonly scope: readonly string[];
  /** Typical turnaround (`improve.tiers.*.time`). */
  readonly time: string;
  /** Contact link text; it contains the tier name so it makes sense out of context. */
  readonly linkLabel: string;
}

type TierDetails = Omit<ImprovementTier, 'name'>;

const [BASIC, PROFESSIONAL, ENTERPRISE] = IMPROVEMENT_TIER_NAMES;

/** Wording from marketing's site-offer-update copy deck (`improve.tiers.*`). */
const TIER_DETAILS: Readonly<Record<string, TierDetails>> = {
  [BASIC]: {
    summary: 'For a smaller site that needs a clear list of fixes, done.',
    scope: [
      'A review of the site and a written list of fixes',
      'Speed fixes such as image sizes and unused code',
      'Page titles, descriptions and headings put in order',
      'Common security and accessibility fixes, such as headers and contrast',
    ],
    time: 'Typically 1 to 2 weeks',
    linkLabel: 'Ask about the Basic tier',
  },
  [PROFESSIONAL]: {
    summary: 'For a site where the problems repeat across many pages.',
    scope: [
      'Everything in Basic, with a full review of all four areas',
      'Work on templates and shared components, not only single pages',
      'Forms, integrations and third-party scripts checked and fixed',
      'Structured data and page metadata across the site',
    ],
    time: 'Typically 3 to 5 weeks',
    linkLabel: 'Ask about the Professional tier',
  },
  [ENTERPRISE]: {
    summary: 'For a site with its own team, environments and release process.',
    scope: [
      'Everything in Professional, plus hosting (Lightsail or AWS) and pipeline review',
      'Changes delivered as pull requests through your release process',
      'Security findings written up with severity and suggested fixes',
      'Work coordinated with your own developers or operations team',
    ],
    time: 'Typically 6 to 10 weeks, in phases',
    linkLabel: 'Ask about the Enterprise tier',
  },
};

function toTier(name: string): ImprovementTier {
  return { name, ...TIER_DETAILS[name] };
}

/** The three tiers in display order. No prices: the scope of a job is agreed on enquiry. */
export const IMPROVEMENT_TIERS: readonly ImprovementTier[] = IMPROVEMENT_TIER_NAMES.map(toTier);

export const TIER_LABELS = {
  audience: 'Who it is for',
} as const;

export const TIERS_FOOTNOTE: string =
  'Every tier starts with scope agreed in writing. Turnaround runs from signed scope and receipt of everything we need from you. We do not promise rankings, traffic or scores; we show you what changed.';

export const BETWEEN_TIERS = {
  title: 'Not sure which tier fits?',
  body: 'If your site sits between two tiers, or you cannot tell which applies, tell us about it. Work between tiers is scoped on enquiry, and we will say which tier is the closer fit.',
  linkLabel: 'Tell us about your site',
} as const;

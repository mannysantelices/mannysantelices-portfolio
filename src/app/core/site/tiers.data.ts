import { IMPROVEMENT_TIER_NAMES } from './services.data';

export interface ImprovementTier {
  readonly name: string;
  readonly summary: string;
  /** Shown under the "Who it is for" label. */
  readonly audience: string;
  /** Contact link text; it contains the tier name so it makes sense out of context. */
  readonly linkLabel: string;
}

type TierDetails = Omit<ImprovementTier, 'name'>;

const [BASIC, PROFESSIONAL, ENTERPRISE] = IMPROVEMENT_TIER_NAMES;

const TIER_DETAILS: Readonly<Record<string, TierDetails>> = {
  [BASIC]: {
    summary: 'A small site, or one clear problem to fix.',
    audience:
      'A small business or an individual with a simple site of a few pages and a short list of things that are not working well.',
    linkLabel: 'Ask about the Basic tier',
  },
  [PROFESSIONAL]: {
    summary: 'A working business site that needs a thorough overhaul.',
    audience:
      'A business whose site brings in enquiries or sales and needs work in several areas at once, or has integrations with other services.',
    linkLabel: 'Ask about the Professional tier',
  },
  [ENTERPRISE]: {
    summary: 'A larger site or web application with security and process needs.',
    audience:
      'An organisation with several environments, a team shipping changes regularly, or security and reliability requirements that need a documented process.',
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

export const BETWEEN_TIERS = {
  title: 'Not sure which tier fits?',
  body: 'If your site sits between two tiers, or you cannot tell which applies, tell us about it. Work between tiers is scoped on enquiry, and we will say which tier is the closer fit.',
  linkLabel: 'Tell us about your site',
} as const;

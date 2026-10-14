import { ContentCard, HeroCopy, SectionCopy, Step } from '../../shared/content.model';

/** `/website-improvement/` wording from marketing's copy deck (`improve.*`). Tiers: core/site. */
export const IMPROVE_HERO: HeroCopy = {
  pageId: 'website-improvement',
  h1: 'Website improvement, from Basic to Enterprise',
  lede: 'We review the website you already have, then improve its speed, security, search visibility and ease of use. The work is scoped in three tiers, so you take on only what your site needs.',
  primaryLabel: 'Ask about your website',
  secondaryLabel: 'Compare the tiers',
  secondaryFragment: 'tiers',
};

export const IMPROVE_AREAS_SECTION: SectionCopy = {
  id: 'what-we-improve',
  tag: 'What we improve',
  heading: 'Four areas we look at on an existing website',
  note: 'Each improvement starts with a review of the site as it is, so the work goes where it is needed.',
};

export const IMPROVE_AREA_CARDS: readonly ContentCard[] = [
  {
    title: 'Speed',
    body: 'We look at what slows pages down, such as large images and unused code, and reduce it.',
  },
  {
    title: 'Security',
    body: 'We check dependencies, forms, headers and access for known weaknesses, and fix what we find within the agreed scope.',
  },
  {
    title: 'Search visibility',
    body: 'We put page titles, descriptions, headings and structured data in order so search engines can read the site.',
  },
  {
    title: 'Accessibility and usability',
    body: 'We check contrast, keyboard use, headings and forms, so more people can use the site and reach you.',
  },
];

export const IMPROVE_TIERS_SECTION: SectionCopy = {
  id: 'tiers',
  tag: 'Tiers',
  heading: 'Three tiers of website improvement',
  note: 'Each tier describes a size of job, not a fixed package. The scope is agreed with you on enquiry.',
};

export const IMPROVE_STEPS_SECTION: SectionCopy = {
  id: 'how-it-starts',
  tag: 'How it starts',
  heading: 'How a website improvement project starts',
  note: 'Three steps from first message to agreed scope.',
};

export const IMPROVE_STEPS: readonly Step[] = [
  {
    title: 'Send us the address',
    body: "Tell us the site's address and what you want to be better. A sentence or two is enough to start.",
  },
  {
    title: 'We review the site',
    body: 'We look at the public site and reply by email with what we found and which tier it points to.',
  },
  {
    title: 'We agree the scope',
    body: 'We send you a description of the work and the tier. Work starts when you have agreed it.',
  },
];

export const IMPROVE_STEPS_LINK: string = 'Start with a message';

export const IMPROVE_RELATED_SECTION: SectionCopy = {
  id: 'related',
  heading: 'Related services',
};

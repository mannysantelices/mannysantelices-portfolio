import { BOOK_CALL_LABEL } from '../../shared/book-call/book-call.copy';
import { BUSINESS_NAME } from '../../core/site/site.config';
import { ContentCard, HeroCopy, SectionCopy } from '../../shared/content.model';

/** Home page wording from marketing's copy deck (`home.*`). */
export const HOME_HERO: HeroCopy = {
  pageId: 'home',
  h1: 'New websites, better websites and DevSecOps consulting on AWS',
  lede: `${BUSINESS_NAME} builds new websites, improves the one you already have, and reviews how your team builds and runs software on AWS. We work remotely, with clients anywhere in the world.`,
  primaryLabel: BOOK_CALL_LABEL,
  secondaryLabel: 'See our services',
  secondaryFragment: 'services',
  eyebrow: 'Remote web and DevSecOps studio',
  proof: ['Every change reviewed by a person', 'Scope agreed before we start', 'AWS-first'],
};

export interface PanelStep {
  readonly name: string;
  readonly detail: string;
  readonly highlight?: boolean;
}

/** Illustrative project outline shown in the home hero panel (decorative, no claims). */
export const HOME_PANEL: {
  readonly label: string;
  readonly pill: string;
  readonly steps: readonly PanelStep[];
} = {
  label: 'Illustration: how a project runs, in four steps',
  pill: 'Illustrative',
  steps: [
    { name: 'Scope', detail: 'Agreed before we start' },
    { name: 'Build', detail: 'Pages, content, forms' },
    { name: 'Human review', detail: 'Every change checked', highlight: true },
    { name: 'Launch on AWS', detail: 'Hosted and handed over' },
  ],
};

/** PetWorld lab band under the services cards. Owner-approved wording. */
export const HOME_LAB = {
  badge: 'Lab project',
  title: 'PetWorld',
  body: 'A 3D browser game where a pet lives, fights and grows on its own. Built in our own time; try the playable demo. It is a side project, not a client service.',
  linkLabel: 'Play the PetWorld demo',
  /** Relative to <base href>; the game is a static folder, not an Angular route. */
  href: 'petworld/',
} as const;

export const HOME_SERVICES_SECTION: SectionCopy = {
  id: 'services',
  tag: 'Services',
  heading: 'Three ways we can help',
  note: 'Pick the one that fits, or tell us the problem and we will point you to the right one.',
};

export const HOME_HOW_SECTION: SectionCopy = {
  id: 'how-we-work',
  tag: 'How we work',
  heading: 'Every change is reviewed by a person',
  note: 'We use AI coding tools, and every change is reviewed by a person before it is delivered.',
};

export const HOME_HOW_CARDS: readonly ContentCard[] = [
  {
    title: 'Reviewed by a person',
    body: 'Every change is reviewed by a person for security, availability and cost before it reaches you, whether it was written by hand or with an AI tool.',
  },
  {
    title: 'AI tools for routine work',
    body: 'We use AI coding tools for repetitive coding and configuration tasks. They are an aid to the work, not a replacement for judgement.',
  },
  {
    title: 'Scope agreed before we start',
    body: 'We agree what will be done before work begins, and tell you if something we find changes that.',
  },
];

/** Link under "How we work" to the remote section on About (`remote.tag`). */
export const HOME_REMOTE_LINK: string = 'How we work remotely';

/**
 * Case-study section. The copy deck has no h2 for it: "Our work" is the ux spec's working
 * heading, pending marketing.
 */
export const HOME_WORK_SECTION: SectionCopy = {
  id: 'work',
  tag: 'Case study',
  heading: 'Our work',
};

export const HOME_ABOUT_SECTION: SectionCopy = {
  id: 'about-teaser',
  heading: 'Who we are',
};

export const HOME_ABOUT = {
  body: `${BUSINESS_NAME} is a remote web and DevSecOps services business. AWS is the platform we know best. The About page covers our background and the tools we work with.`,
  linkLabel: `About ${BUSINESS_NAME}`,
} as const;

import { BUSINESS_NAME } from '../../core/site/site.config';
import { ContentCard, HeroCopy, SectionCopy } from '../../shared/content.model';

/** Home page wording from marketing's copy deck (`home.*`). */
export const HOME_HERO: HeroCopy = {
  pageId: 'home',
  h1: 'New websites, better websites and DevSecOps consulting on AWS',
  lede: `${BUSINESS_NAME} builds new websites, improves the one you already have, and reviews how your team builds and runs software on AWS. We work remotely, with clients anywhere in the world.`,
  primaryLabel: 'Tell us about your project',
  secondaryLabel: 'See our services',
  secondaryFragment: 'services',
};

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

export const HOME_ABOUT_SECTION: SectionCopy = {
  id: 'about-teaser',
  heading: 'Who we are',
};

export const HOME_ABOUT = {
  body: `${BUSINESS_NAME} is a remote web and DevSecOps services business. AWS is the platform we know best. The About page covers our background and the tools we work with.`,
  linkLabel: `About ${BUSINESS_NAME}`,
} as const;

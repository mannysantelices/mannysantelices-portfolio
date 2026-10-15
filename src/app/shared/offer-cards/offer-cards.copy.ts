import { SectionCopy } from '../content.model';

/** Marketing's site-offer-update copy deck, `start.*`. */
const START_TAG: string = 'Start small';
const START_HEADING: string = 'Not sure where to begin? Start with a Snapshot';

/** Home: both Snapshots. */
export const START_SECTION: SectionCopy = {
  id: 'start',
  tag: START_TAG,
  heading: START_HEADING,
  note: 'Two fixed, small reviews. You get a clear list of what to fix first, whether or not you work with us afterwards.',
};

/** Service pages show one Snapshot, so the "Two ... reviews" note is left out. */
export const START_SECTION_SINGLE: SectionCopy = {
  id: 'start',
  tag: START_TAG,
  heading: START_HEADING,
};

export const OFFER_LABELS = {
  get: 'What you get',
  how: 'How it works',
} as const;

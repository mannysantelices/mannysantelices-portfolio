import { ContentCard, SectionCopy } from '../../shared/content.model';

/**
 * Marketing's site-offer-update copy deck, `remote.*`. Owner decision: no working hours or time
 * zone anywhere, so the `remote.tz` card is replaced by an async-first "calls by arrangement" card
 * (wording pending marketing), and `remote.tools.body` ships without the owner note.
 */
export const REMOTE_SECTION: SectionCopy = {
  id: 'remote',
  tag: 'How we work remotely',
  heading: 'Remote by design, wherever you are',
  note: 'We work with clients anywhere in the world. Most of the work happens in writing, so you can reply when it suits you.',
};

export const REMOTE_CARDS: readonly ContentCard[] = [
  {
    title: 'Async first',
    body: 'Questions, findings and updates come by email or in writing, so there is a record of what was agreed. Calls are there when a conversation is faster.',
  },
  {
    title: 'Calls by arrangement',
    body: 'When a call helps, we arrange one at a time agreed with you. Everything else stays in writing, so nothing waits for a meeting.',
  },
  {
    title: 'Tools',
    body: 'Email for decisions, recorded video walkthroughs for findings, and pull requests when we change code in your repository. Your site and AWS resources stay in your own accounts.',
  },
];

export const REMOTE_FLOW_TITLE: string = 'How a project runs';

export const REMOTE_FLOW_STEPS: readonly string[] = [
  'A call or email to understand what you need',
  'Scope agreed in writing before work starts',
  'Work in stages, with a written update at each one',
  'Tested before hand-over, by someone other than the person who built it',
  'Hand-over notes: how it works, where it is hosted and who owns what',
];

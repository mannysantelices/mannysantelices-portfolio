import { BOOK_CALL_LABEL } from '../../shared/book-call/book-call.copy';
import { ContentCard, HeroCopy, SectionCopy, Step } from '../../shared/content.model';

/** `/website-creation/` wording from marketing's copy deck (`create.*`). */
export const CREATE_HERO: HeroCopy = {
  pageId: 'website-creation',
  h1: 'Website creation for your business',
  lede: 'We plan, build and launch a new website for your business, shaped around your brand and content, with search engines and enquiries considered from the start.',
  primaryLabel: BOOK_CALL_LABEL,
  secondaryLabel: 'See what you get',
  secondaryFragment: 'what-you-get',
};

export const CREATE_GET_SECTION: SectionCopy = {
  id: 'what-you-get',
  tag: 'What you get',
  heading: 'What a new website from us includes',
  note: 'The usual parts of a new site. The exact scope is agreed with you before work starts.',
};

/** E-commerce is mentioned here once and nowhere else on the site; no payment provider is named. */
export const CREATE_GET_CARDS: readonly ContentCard[] = [
  {
    title: 'Design and build',
    points: [
      'Pages designed around your brand and the content you have or plan to write',
      'Layouts that work on phones, tablets and desktop screens',
      'Built with accessibility in mind: readable contrast, keyboard use, clear headings',
    ],
  },
  {
    title: 'Ready for search engines',
    points: [
      'A title and description written for each page',
      'A sitemap and structured data, so search engines can read the site',
      'Pages delivered as ready-made HTML, so content is there when a page loads',
    ],
  },
  {
    title: 'Enquiries and contact',
    points: [
      'A contact or enquiry form that sends messages to your email',
      'Clear routes to the form from every page',
    ],
  },
  {
    title: 'Launch, hosting and extras',
    points: [
      'We launch the site with you and hand over what you need to run it',
      'Hosting on AWS where it suits the site',
      'E-commerce is available on request',
    ],
  },
];

export const CREATE_FOR_SECTION: SectionCopy = {
  id: 'who-it-is-for',
  tag: 'Who it is for',
  heading: 'Who website creation is for',
  note: 'Three common starting points.',
};

export const CREATE_FOR_CARDS: readonly ContentCard[] = [
  {
    title: 'A business with no website yet',
    body: 'You need a clear, credible site that says what you do and lets people get in touch.',
  },
  {
    title: 'A site that needs replacing',
    body: 'Your current site is dated or hard to change, and starting again is simpler than repairing it.',
  },
  {
    title: 'A new product or service',
    body: 'You are launching something and want it to have its own site, separate from what you run today.',
  },
];

export const CREATE_STEPS_SECTION: SectionCopy = {
  id: 'how-it-starts',
  tag: 'How it starts',
  heading: 'How a website creation project starts',
  note: 'Three steps from first message to agreed scope.',
};

export const CREATE_STEPS: readonly Step[] = [
  {
    title: 'Send us a message',
    body: 'Tell us about your business, what the site is for and anything you already have, such as a logo or text.',
  },
  {
    title: 'We ask questions',
    body: 'We reply by email with questions about pages, content and features, so we understand what you need.',
  },
  {
    title: 'We agree the scope',
    body: 'We send you a description of what we will build. Work starts when you have agreed it.',
  },
];

export const CREATE_STEPS_LINK: string = 'Start with a message';

export const CREATE_RELATED_SECTION: SectionCopy = {
  id: 'related',
  heading: 'Related services',
};

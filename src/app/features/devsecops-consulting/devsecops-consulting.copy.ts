import { BOOK_CALL_LABEL } from '../../shared/book-call/book-call.copy';
import { ContentCard, HeroCopy, SectionCopy, Step } from '../../shared/content.model';

/** `/devsecops-consulting/` wording from marketing's copy deck (`devsecops.*`). */
export const DEVSECOPS_HERO: HeroCopy = {
  pageId: 'devsecops-consulting',
  h1: 'DevSecOps consulting on AWS',
  lede: 'We review how your team builds, ships and runs software on AWS, looking at security, reliability and cost together. You receive a prioritised list of what to fix.',
  primaryLabel: BOOK_CALL_LABEL,
  secondaryLabel: 'See what we review',
  secondaryFragment: 'what-we-review',
};

export const DEVSECOPS_REVIEW_SECTION: SectionCopy = {
  id: 'what-we-review',
  tag: 'What we review',
  heading: 'What a DevSecOps consultation covers',
  note: 'Security, reliability and cost are looked at together, because on AWS they come from the same decisions.',
};

export const DEVSECOPS_REVIEW_CARDS: readonly ContentCard[] = [
  {
    title: 'Pipelines and delivery',
    points: [
      'How code gets from a commit to production: build, test and deploy steps',
      'CI/CD pipeline permissions, secrets handling and third-party actions',
      'Whether a failed check or test stops a release',
    ],
  },
  {
    title: 'Infrastructure and access',
    points: [
      'Infrastructure as code: what is defined in code and what was changed by hand',
      'IAM roles and policies, network exposure and public endpoints',
      'Backups, recovery and what happens when a component fails',
    ],
  },
  {
    title: 'Cost control',
    points: [
      'Where the AWS bill goes, by service and by environment',
      'Tagging and cost allocation, so spend can be traced to an owner',
      'Resources that are oversized, idle or no longer used',
    ],
  },
];

export const DEVSECOPS_RECEIVE_SECTION: SectionCopy = {
  id: 'what-you-receive',
  tag: 'What you receive',
  heading: 'What you receive at the end',
  note: 'A written report your team can work from.',
};

export const DEVSECOPS_RECEIVE_CARDS: readonly ContentCard[] = [
  {
    title: 'A prioritised list of findings',
    body: 'Each finding says what we saw, why it matters and what we suggest, ordered by how much it matters.',
  },
  {
    title: 'Plain-language explanations',
    body: 'The findings are written so that both engineers and the people who approve budgets can follow them.',
  },
  {
    title: 'A conversation about next steps',
    body: 'We go through the findings with you and answer questions. Carrying out the fixes can be scoped separately.',
  },
];

export const DEVSECOPS_STEPS_SECTION: SectionCopy = {
  id: 'how-it-starts',
  tag: 'How it starts',
  heading: 'How a DevSecOps consultation starts',
  note: 'Three steps from first message to agreed scope.',
};

export const DEVSECOPS_STEPS: readonly Step[] = [
  {
    title: 'Send us a message',
    body: 'Tell us what you run on AWS, roughly how it is deployed, and what worries you most.',
  },
  {
    title: 'We agree what to review',
    body: 'We agree which systems are in scope and what access the review needs, keeping that access to the minimum.',
  },
  {
    title: 'We review and report',
    body: 'We carry out the review and send you the findings, then go through them with you.',
  },
];

export const DEVSECOPS_STEPS_LINK: string = 'Start with a message';

export const DEVSECOPS_RELATED_SECTION: SectionCopy = {
  id: 'related',
  heading: 'Related services',
};

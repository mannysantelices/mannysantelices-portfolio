import { RichText, SectionCopy } from '../../shared/content.model';

/** Second half of the case study "Web version": results, and what it means for a client. */
export const RESULTS_SECTION: SectionCopy = { id: 'results', heading: 'Measured results' };

export const RESULTS_INTRO: string =
  'All measurements were taken by our QA function on the built site, served locally, before publication. The rebuilt site and the visual refresh are now live, and one deployment run per push was confirmed on 2026-10-14.';

export const RESULTS_CAPTION: string = 'What we measured, before and after';
export const RESULTS_COLUMNS: readonly string[] = ['What', 'Before', 'After', 'How measured'];

/** Each row: what, before, after, how measured. */
export const RESULTS_ROWS: readonly (readonly string[])[] = [
  [
    'Deployments per push',
    '2, racing',
    '1 run per push (confirmed live, 2026-10-14)',
    'GitHub settings API and the live run history',
  ],
  [
    'Pages',
    '1',
    '5 prerendered, unique metadata on each',
    'Build output; script and manual check per route',
  ],
  [
    'Lowest text contrast',
    '4.20:1 (fail)',
    'All contrast checks pass: 47 of 47 after the visual refresh',
    'Colour tokens plus computed colour of every visible text node, both themes',
  ],
  ['Form field borders', '2.19:1 (fail)', '4.75:1 dark, 5.21:1 light (after the rebuild)', 'Same'],
  [
    'Known vulnerabilities, production packages',
    'Not known (no audit, alerts off)',
    '0',
    'npm audit --omit=dev',
  ],
  [
    'Layout shift (CLS) on throttled mobile',
    'Not measured',
    '0 to 0.0001',
    'Headless Chrome at 375 px, about 1.6 Mbps, 150 ms latency, 4x CPU slowdown',
  ],
  [
    'Largest Contentful Paint, same conditions',
    'Not measured',
    '0.61 to 0.73 s on all five pages',
    'Same. Not a Lighthouse score',
  ],
  ['Automated tests', 'None run before deploy', '110 passing, run in the pipeline', 'npm test'],
];

export const RESULTS_NOT_MEASURED: string =
  'What we did not measure: real-user performance, search rankings, traffic or enquiries. An automated accessibility scan (axe-core) was not run; manual checks were done instead. Testing used Chromium only.';

export const CLIENT_SECTION: SectionCopy = {
  id: 'for-clients',
  heading: 'What this means for a client',
};

export const CLIENT_ITEMS: readonly RichText[] = [
  [
    { strong: 'You get a written list of what is wrong before anything is changed.' },
    ' Each issue is marked as checked or not.',
  ],
  [
    { strong: 'You get acceptance criteria up front,' },
    ' so "done" means something you can check yourself.',
  ],
  [
    { strong: 'Your site is tested by someone other than the person who built it,' },
    ' and the fixes are tested again.',
  ],
  [
    { strong: 'For Enterprise clients:' },
    ' the same review covers deployment, pipeline permissions, dependency checks and supply-chain pinning, not only the pages people see.',
  ],
  [{ strong: 'We report honestly.' }, ' If something was not measured, we say so.'],
];

export const CLIENT_SNAPSHOT_LINK: RichText = [
  {
    link: 'Start with a Website Snapshot',
    path: '/website-improvement',
    fragment: 'website-snapshot',
  },
];

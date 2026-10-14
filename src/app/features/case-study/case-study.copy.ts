import { PAGE_META } from '../../core/seo/page-meta.data';
import { RichText, SectionCopy } from '../../shared/content.model';

/**
 * `/case-studies/own-site-rebuild/` wording: marketing's case study, "Web version"
 * (`team/marketing/pricing-and-scope/case-study-own-site.md`). The h1 is typed once, in page meta.
 */
const IMPROVEMENT_PATH: string = '/website-improvement';

export const CASE_HERO = {
  tag: 'Case study',
  h1: PAGE_META['case-study-own-site'].headline ?? '',
  lede: [
    { strong: "This is our own site, not a client's." },
    ' We ran it through the same ',
    { link: 'website-improvement process', path: IMPROVEMENT_PATH },
    ' we sell: audit, written brief with acceptance criteria, build, independent testing, sign-off. We have no traffic or revenue results to report. What we can show is what was wrong, what we changed, and what we measured.',
  ] as RichText,
  secondaryLabel: 'Website improvement',
  secondaryPath: IMPROVEMENT_PATH,
} as const;

export const PROBLEM_SECTION: SectionCopy = { id: 'problem', heading: 'The problem' };

export const PROBLEM_INTRO: string =
  'The old site was one page that read like a personal CV. A visitor could not tell what we offer, and search engines could not match it to any of our three services because the page did not name them. Our audits also found real defects:';

export const PROBLEM_ITEMS: readonly RichText[] = [
  [
    { strong: 'The site could go live with the wrong content.' },
    " Every push started two deployments about 15 seconds apart: GitHub's built-in one, which publishes the raw source folder, and ours, which publishes the built site. Whichever finished last went live. Ours usually won only because it took longer. (devops review, verified from GitHub's run and deployment records.)",
  ],
  [
    { strong: 'Text below accessibility standards.' },
    " Form labels, some secondary text, placeholder text and form field borders failed WCAG AA contrast. The weakest text was 4.20:1 against a 4.5:1 requirement, and field borders were 2.19:1 against 3:1. (UX audit, calculated from the site's colour tokens.)",
  ],
  [
    { strong: 'Rough edges on the way to contact.' },
    ' Menu jumps hid the heading they jumped to, the Contact button was cut off at tablet widths, a hidden menu still took keyboard focus, and the form did not confirm a send.',
  ],
  [
    { strong: 'An unhardened pipeline.' },
    ' Third-party build actions referenced by movable tags, deploy rights granted to the build step that runs third-party install scripts, and no tests before deploy. Dependency alerts were off, so nobody knew whether any packages had known vulnerabilities.',
  ],
];

export const APPROACH_SECTION: SectionCopy = { id: 'approach', heading: 'The approach' };

export const APPROACH_STEPS: readonly RichText[] = [
  [
    { strong: 'Audit.' },
    ' UX, search and DevSecOps reviews, read-only, each finding marked verified or not.',
  ],
  [
    { strong: 'Brief.' },
    ' 46 written acceptance criteria covering build, routes, metadata, content, accessibility and pipeline.',
  ],
  [{ strong: 'Build and fix' }, ', with the deployment settings changed first.'],
  [
    { strong: 'Independent QA' },
    ' against every criterion, with defects sent back and re-tested until closed.',
  ],
  [{ strong: 'Acceptance' }, ' against the brief, with owner-only items listed in a hand-over.'],
];

export const CHANGED_SECTION: SectionCopy = { id: 'what-changed', heading: 'What changed' };

export const CHANGED_ITEMS: readonly RichText[] = [
  [
    { strong: 'One deployment path.' },
    ' Pages publishing switched to the GitHub Actions workflow only (build_type: workflow, verified). A rule now blocks force pushes and deletion of the main branch.',
  ],
  [
    { strong: 'One page became five.' },
    ' Home, three service pages (creation, improvement, ',
    { link: 'DevSecOps consultation', path: '/devsecops-consulting' },
    ') and an About page. Each page is prerendered to static HTML with its own title, description, canonical URL, social tags and structured data, and is listed in the sitemap.',
  ],
  [
    { strong: 'Accessibility fixed.' },
    ' Every text and border contrast failure from the audit was corrected, in both light and dark themes. The menu, skip link, focus outlines, form feedback and no-JavaScript fallback were reworked.',
  ],
  [
    { strong: 'Pipeline hardened.' },
    ' Build actions pinned to exact commit hashes, deploy rights limited to the deploy job, tests run before every build, in-progress deploys no longer cancelled midway, and weekly automated dependency update checks (Dependabot) configured.',
  ],
  [
    { strong: 'Visual refresh.' },
    ' New hero images in modern formats with fallbacks, size-budgeted and stripped of embedded metadata. Fonts served from the site itself.',
  ],
];

export const RELATED_SECTION: SectionCopy = { id: 'related', heading: 'Our services' };

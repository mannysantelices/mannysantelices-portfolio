import { PageId } from './page-id';

export interface ServiceSummary {
  readonly id: PageId;
  readonly name: string;
  /** Router path, without leading or trailing slash. */
  readonly path: string;
  /** The visible card summary and the JSON-LD `description`: one sentence, so they cannot drift. */
  readonly summary: string;
  /** One line under the service name on a related-service card (`related.*.line`). */
  readonly relatedLine: string;
}

/** The three services, in display order. A service name is typed here and nowhere else. */
export const SERVICES: readonly ServiceSummary[] = [
  {
    id: 'website-creation',
    name: 'Website creation',
    path: 'website-creation',
    summary:
      'A new business website, planned, built and launched for your brand and content, ready for search engines and for enquiries.',
    relatedLine: 'A new website for your business, planned, built and launched.',
  },
  {
    id: 'website-improvement',
    name: 'Website improvement',
    path: 'website-improvement',
    summary:
      'We review the website you already have and improve its speed, security, search visibility and ease of use. Scoped in three tiers.',
    relatedLine: 'Already have a site? We review it and improve it, in three tiers.',
  },
  {
    id: 'devsecops-consulting',
    name: 'DevSecOps consulting',
    path: 'devsecops-consulting',
    summary:
      'A review of how your team builds, ships and runs software on AWS, with a prioritised list of what to fix.',
    relatedLine: 'A review of how your team builds, ships and runs software on AWS.',
  },
];

/** The services a page links to as "related": every service except the page's own. */
export function servicesOtherThan(pageId: PageId): readonly ServiceSummary[] {
  return SERVICES.filter((service: ServiceSummary) => service.id !== pageId);
}

/** Website improvement tiers, in display order. The page and the JSON-LD offers read these names. */
export const IMPROVEMENT_TIER_NAMES: readonly string[] = ['Basic', 'Professional', 'Enterprise'];

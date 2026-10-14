import { PageId } from '../../core/site/page-id';
import { SERVICES, ServiceSummary } from '../../core/site/services.data';

/** A home-page service card: the shared service record plus the card-only wording. */
export interface ServiceCard {
  readonly service: ServiceSummary;
  /** Decorative; only characters the mono font draws. */
  readonly glyph: string;
  readonly points: readonly string[];
  /** Contains the service name, so the link makes sense out of context. */
  readonly linkLabel: string;
}

type CardDetails = Omit<ServiceCard, 'service'>;

/** Wording from marketing's copy deck (`home.services.card*`). */
const CARD_DETAILS: Readonly<Partial<Record<PageId, CardDetails>>> = {
  'website-creation': {
    glyph: '</>',
    points: [
      'A site designed around your brand and your content',
      'Page titles, descriptions and a sitemap set up for search engines',
      'A contact or enquiry form, so visitors can reach you',
    ],
    linkLabel: 'More about website creation',
  },
  'website-improvement': {
    glyph: '↑',
    points: [
      'Starts with a review of the site as it is today',
      'Three tiers: Basic, Professional and Enterprise',
      'Work that falls between tiers is scoped on enquiry',
    ],
    linkLabel: 'More about website improvement',
  },
  'devsecops-consulting': {
    glyph: '✓',
    points: [
      'Security, reliability and cost looked at together',
      'Covers pipelines, infrastructure as code and access',
      'Findings written up in plain language',
    ],
    linkLabel: 'More about DevSecOps consulting',
  },
};

function toServiceCard(service: ServiceSummary): ServiceCard {
  const details = CARD_DETAILS[service.id];
  if (!details) {
    throw new Error(`No home card wording is defined for service "${service.id}"`);
  }
  return { service, ...details };
}

/** One card per service, in the services' display order. */
export const SERVICE_CARDS: readonly ServiceCard[] = SERVICES.map(toServiceCard);

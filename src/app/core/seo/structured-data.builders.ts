import { FOUNDER } from '../site/founder.data';
import { IMPROVEMENT_TIER_NAMES, SERVICES, ServiceSummary } from '../site/services.data';
import {
  AREA_SERVED,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_URL,
} from '../site/site.config';
import { PAGE_META, canonicalUrl } from './page-meta.data';
import { PageMeta } from './page-meta.model';
import {
  JsonLdNode,
  ORGANIZATION_ID,
  PERSON_ID,
  WEBSITE_ID,
  breadcrumbId,
  reference,
  serviceId,
  webPageId,
} from './structured-data.model';

const LANGUAGE: string = 'en';
const ORGANIZATION_DESCRIPTION: string = `${BUSINESS_NAME} provides website creation, website improvement and DevSecOps consulting on AWS.`;

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS_NAME,
    inLanguage: LANGUAGE,
    publisher: reference(ORGANIZATION_ID),
  };
}

/** Name and URL only: for routes that do not show the organisation's description. */
export function organizationNode(): JsonLdNode {
  return { '@type': 'Organization', '@id': ORGANIZATION_ID, name: BUSINESS_NAME, url: SITE_URL };
}

/** For `/` and `/about/`. `extra` carries the offer catalogue or the founder reference. */
export function describedOrganizationNode(extra: JsonLdNode): JsonLdNode {
  return {
    ...organizationNode(),
    description: ORGANIZATION_DESCRIPTION,
    areaServed: AREA_SERVED,
    ...extra,
  };
}

function serviceOffer(service: ServiceSummary): JsonLdNode {
  const url = canonicalUrl(PAGE_META[service.id]);
  return {
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', '@id': serviceId(url), name: service.name, url },
  };
}

/** The three services, then any further offers (the Snapshots on `/`). */
export function servicesCatalog(moreOffers: readonly JsonLdNode[]): JsonLdNode {
  const offers: JsonLdNode[] = [...SERVICES.map(serviceOffer), ...moreOffers];
  return { '@type': 'OfferCatalog', name: 'Services', itemListElement: offers };
}

/** Tier offers point back at the one service, so no extra Service name needs to be visible. */
export function tiersCatalog(canonical: string): JsonLdNode {
  const offers = IMPROVEMENT_TIER_NAMES.map((tierName: string): JsonLdNode => {
    return { '@type': 'Offer', name: tierName, itemOffered: reference(serviceId(canonical)) };
  });
  return { '@type': 'OfferCatalog', name: 'Website improvement tiers', itemListElement: offers };
}

export function serviceNode(service: ServiceSummary, extra: JsonLdNode): JsonLdNode {
  const url = canonicalUrl(PAGE_META[service.id]);
  return {
    '@type': 'Service',
    '@id': serviceId(url),
    name: service.name,
    description: service.summary,
    url,
    provider: reference(ORGANIZATION_ID),
    areaServed: AREA_SERVED,
    ...extra,
  };
}

function breadcrumbItem(position: number, meta: PageMeta): JsonLdNode {
  return {
    '@type': 'ListItem',
    position,
    name: meta.breadcrumbLabel,
    item: canonicalUrl(meta),
  };
}

export function breadcrumbNode(meta: PageMeta): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(canonicalUrl(meta)),
    itemListElement: [breadcrumbItem(1, PAGE_META.home), breadcrumbItem(2, meta)],
  };
}

export function webPageNode(meta: PageMeta, pageType: string, extra: JsonLdNode): JsonLdNode {
  const url = canonicalUrl(meta);
  return {
    '@type': pageType,
    '@id': webPageId(url),
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: LANGUAGE,
    isPartOf: reference(WEBSITE_ID),
    ...extra,
  };
}

/** `/about/` only. The email is a plain address, as the search spec asks (no `mailto:` prefix). */
export function personNode(): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    url: canonicalUrl(PAGE_META.about),
    worksFor: reference(ORGANIZATION_ID),
    email: CONTACT_EMAIL,
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    knowsAbout: FOUNDER.knowsAbout,
  };
}

import { PageId } from '../site/page-id';
import { SERVICES, ServiceSummary } from '../site/services.data';
import { PAGE_META, canonicalUrl } from './page-meta.data';
import { PageMeta } from './page-meta.model';
import {
  breadcrumbNode,
  describedOrganizationNode,
  organizationNode,
  personNode,
  serviceNode,
  servicesCatalog,
  tiersCatalog,
  webPageNode,
  websiteNode,
} from './structured-data.builders';
import {
  JsonLdGraph,
  JsonLdNode,
  ORGANIZATION_ID,
  PERSON_ID,
  breadcrumbId,
  reference,
  serviceId,
} from './structured-data.model';

function graphOf(nodes: readonly JsonLdNode[]): JsonLdGraph {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

function homeGraph(): JsonLdGraph {
  const organization = describedOrganizationNode({ hasOfferCatalog: servicesCatalog() });
  const page = webPageNode(PAGE_META.home, 'WebPage', { about: reference(ORGANIZATION_ID) });
  return graphOf([websiteNode(), organization, page]);
}

function aboutGraph(): JsonLdGraph {
  const meta: PageMeta = PAGE_META.about;
  const organization = describedOrganizationNode({ founder: reference(PERSON_ID) });
  const page = webPageNode(meta, 'AboutPage', {
    breadcrumb: reference(breadcrumbId(canonicalUrl(meta))),
    mainEntity: reference(ORGANIZATION_ID),
  });
  return graphOf([websiteNode(), organization, personNode(), breadcrumbNode(meta), page]);
}

function serviceExtras(service: ServiceSummary, canonical: string): JsonLdNode {
  if (service.id === 'website-improvement') {
    return { hasOfferCatalog: tiersCatalog(canonical) };
  }
  return {};
}

function serviceGraph(service: ServiceSummary): JsonLdGraph {
  const meta: PageMeta = PAGE_META[service.id];
  const canonical = canonicalUrl(meta);
  const page = webPageNode(meta, 'WebPage', {
    breadcrumb: reference(breadcrumbId(canonical)),
    mainEntity: reference(serviceId(canonical)),
  });
  return graphOf([
    websiteNode(),
    organizationNode(),
    serviceNode(service, serviceExtras(service, canonical)),
    breadcrumbNode(meta),
    page,
  ]);
}

/** The whole JSON-LD graph for one route (search spec 3.4 to 3.8). */
export function buildGraph(pageId: PageId): JsonLdGraph {
  if (pageId === 'home') {
    return homeGraph();
  }
  if (pageId === 'about') {
    return aboutGraph();
  }
  const service = SERVICES.find((candidate: ServiceSummary) => candidate.id === pageId);
  if (!service) {
    throw new Error(`No service is defined for page "${pageId}"`);
  }
  return serviceGraph(service);
}

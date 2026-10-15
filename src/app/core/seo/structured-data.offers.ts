import { SOCIAL_IMAGE, SITE_URL, AREA_SERVED } from '../site/site.config';
import { SNAPSHOTS, Snapshot } from '../site/snapshots.data';
import { PAGE_META, canonicalUrl } from './page-meta.data';
import { PageMeta } from './page-meta.model';
import {
  JsonLdNode,
  ORGANIZATION_ID,
  WEBSITE_ID,
  reference,
  serviceId,
  webPageId,
} from './structured-data.model';

/** `@id` and `url` of a Snapshot: its service page plus the card's anchor (search spec 4.1). */
export function snapshotUrl(snapshot: Snapshot): string {
  return `${canonicalUrl(PAGE_META[snapshot.pageId])}#${snapshot.anchorId}`;
}

function snapshotOffer(snapshot: Snapshot): JsonLdNode {
  const url = snapshotUrl(snapshot);
  return {
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', '@id': url, name: snapshot.title, url },
  };
}

/** The two Snapshots as catalogue offers on `/` (search spec 4.2). No price. */
export function snapshotOffers(): JsonLdNode[] {
  return SNAPSHOTS.map(snapshotOffer);
}

/** A Snapshot's own Service node on its service page (search spec 4.3). */
export function snapshotServiceNode(snapshot: Snapshot): JsonLdNode {
  const url = snapshotUrl(snapshot);
  return {
    '@type': 'Service',
    '@id': url,
    name: snapshot.title,
    description: snapshot.lede,
    url,
    provider: reference(ORGANIZATION_ID),
    areaServed: AREA_SERVED,
    isRelatedTo: reference(serviceId(canonicalUrl(PAGE_META[snapshot.pageId]))),
  };
}

/** The case study's Article (search spec 2.4). `headline` must equal the visible `h1`. */
export function articleNode(meta: PageMeta): JsonLdNode {
  const url = canonicalUrl(meta);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: meta.headline,
    description: meta.description,
    url,
    mainEntityOfPage: reference(webPageId(url)),
    image: `${SITE_URL}${SOCIAL_IMAGE.path}`,
    datePublished: meta.publishedDate,
    dateModified: meta.publishedDate,
    inLanguage: 'en',
    author: reference(ORGANIZATION_ID),
    publisher: reference(ORGANIZATION_ID),
    about: [
      reference(WEBSITE_ID),
      reference(serviceId(canonicalUrl(PAGE_META['website-improvement']))),
    ],
  };
}

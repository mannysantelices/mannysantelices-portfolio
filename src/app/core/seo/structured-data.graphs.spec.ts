import { FOUNDER } from '../site/founder.data';
import { PageId } from '../site/page-id';
import { AREA_SERVED, BUSINESS_NAME, SITE_URL } from '../site/site.config';
import { ALL_PAGE_META, PAGE_META, canonicalUrl } from './page-meta.data';
import { PageMeta } from './page-meta.model';
import { buildGraph } from './structured-data.graphs';
import { JsonLdNode, ORGANIZATION_ID, PERSON_ID } from './structured-data.model';

const SERVICE_PAGE_IDS: readonly PageId[] = [
  'website-creation',
  'website-improvement',
  'devsecops-consulting',
];
const FORBIDDEN_STRINGS: readonly string[] = [
  'DevSecFinOps',
  'Claude Code',
  'Codex',
  'priceRange',
  'priceCurrency',
  '"price"',
  '"address"',
  '"telephone"',
  'hasCredential',
  'AggregateRating',
  '"Review"',
  'assets/logos/',
];

function serialise(pageId: PageId): string {
  return JSON.stringify(buildGraph(pageId));
}

function nodeOfType(pageId: PageId, type: string): JsonLdNode | undefined {
  return buildGraph(pageId)['@graph'].find((node: JsonLdNode) => node['@type'] === type);
}

describe('structured data graphs', () => {
  for (const meta of ALL_PAGE_META) {
    it(`serialises "${meta.id}" to JSON that parses back to one graph`, () => {
      const parsed: unknown = JSON.parse(serialise(meta.id));

      expect(parsed).toEqual(buildGraph(meta.id));
      expect(buildGraph(meta.id)['@context']).toBe('https://schema.org');
    });

    it(`puts no forbidden property or term in "${meta.id}"`, () => {
      const json = serialise(meta.id);

      for (const forbidden of FORBIDDEN_STRINGS) {
        expect(json).not.toContain(forbidden);
      }
    });

    it(`starts every @id of "${meta.id}" with the site URL`, () => {
      const ids = serialise(meta.id).match(/"@id":"[^"]+"/g) ?? [];

      expect(ids.length).toBeGreaterThan(0);
      for (const id of ids) {
        expect(id.startsWith(`"@id":"${SITE_URL}`)).toBe(true);
      }
    });
  }

  it('gives the home page a WebSite and a named Organization serving worldwide', () => {
    const organization = nodeOfType('home', 'Organization');

    expect(nodeOfType('home', 'WebSite')?.['@id']).toBeTruthy();
    expect(organization?.['@id']).toBe(ORGANIZATION_ID);
    expect(organization?.['name']).toBe(BUSINESS_NAME);
    expect(organization?.['areaServed']).toBe(AREA_SERVED);
  });

  for (const pageId of SERVICE_PAGE_IDS) {
    it(`gives "${pageId}" a Service provided by the organisation, and a breadcrumb`, () => {
      const service = nodeOfType(pageId, 'Service');

      expect(service?.['url']).toBe(canonicalUrl(PAGE_META[pageId]));
      expect(service?.['provider']).toEqual({ '@id': ORGANIZATION_ID });
      expect(service?.['areaServed']).toBe(AREA_SERVED);
      expect(nodeOfType(pageId, 'BreadcrumbList')).toBeDefined();
    });
  }

  it('ties the founder and the organisation together on the about page', () => {
    const person = nodeOfType('about', 'Person');

    expect(person?.['@id']).toBe(PERSON_ID);
    expect(person?.['name']).toBe(FOUNDER.name);
    expect(person?.['worksFor']).toEqual({ '@id': ORGANIZATION_ID });
    expect(nodeOfType('about', 'Organization')?.['founder']).toEqual({ '@id': PERSON_ID });
    expect(nodeOfType('about', 'BreadcrumbList')).toBeDefined();
  });

  it('describes the case study as an Article by the organisation, headline equal to the h1', () => {
    const meta = PAGE_META['case-study-own-site'];
    const article = nodeOfType('case-study-own-site', 'Article');

    expect(article?.['headline']).toBe(meta.headline);
    expect(article?.['author']).toEqual({ '@id': ORGANIZATION_ID });
    expect(article?.['datePublished']).toBe(meta.publishedDate);
    expect(nodeOfType('case-study-own-site', 'BreadcrumbList')).toBeDefined();
  });

  it('lists five offers on home: three services and two Snapshots', () => {
    const catalog = nodeOfType('home', 'Organization')?.['hasOfferCatalog'] as JsonLdNode;
    const offers = catalog['itemListElement'] as readonly JsonLdNode[];

    expect(offers.length).toBe(5);
  });

  it('keeps the founder out of every other page', () => {
    const otherPages = ALL_PAGE_META.filter((meta: PageMeta) => meta.id !== 'about');

    for (const meta of otherPages) {
      const json = serialise(meta.id);

      expect(json).not.toContain('"Person"');
      expect(json).not.toContain('"founder"');
      expect(json).not.toContain(FOUNDER.name);
    }
  });
});

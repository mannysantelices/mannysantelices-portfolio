import { FOUNDER } from '../site/founder.data';
import { BUSINESS_NAME, SITE_URL } from '../site/site.config';
import { ALL_PAGE_META, PAGE_META, canonicalUrl } from './page-meta.data';
import { PageMeta } from './page-meta.model';

const TITLE_MAX: number = 70;
const DESCRIPTION_MIN: number = 70;
const DESCRIPTION_MAX: number = 160;

function distinctCount(values: readonly string[]): number {
  return new Set(values).size;
}

describe('page meta data', () => {
  it('defines five pages', () => {
    expect(ALL_PAGE_META.length).toBe(5);
  });

  for (const meta of ALL_PAGE_META) {
    it(`keeps the title of "${meta.id}" within ${TITLE_MAX} characters, with the business name`, () => {
      expect(meta.title.length).toBeLessThanOrEqual(TITLE_MAX);
      expect(meta.title).toContain(BUSINESS_NAME);
    });

    it(`keeps the description of "${meta.id}" between ${DESCRIPTION_MIN} and ${DESCRIPTION_MAX} characters`, () => {
      expect(meta.description.length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
      expect(meta.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    });

    it(`gives "${meta.id}" an absolute canonical with a trailing slash`, () => {
      const canonical = canonicalUrl(meta);

      expect(canonical.startsWith(SITE_URL)).toBe(true);
      expect(canonical.endsWith('/')).toBe(true);
    });
  }

  it('has no two pages sharing a title, a description or a canonical', () => {
    const titles = ALL_PAGE_META.map((meta: PageMeta) => meta.title);
    const descriptions = ALL_PAGE_META.map((meta: PageMeta) => meta.description);
    const canonicals = ALL_PAGE_META.map((meta: PageMeta) => canonicalUrl(meta));

    expect(distinctCount(titles)).toBe(ALL_PAGE_META.length);
    expect(distinctCount(descriptions)).toBe(ALL_PAGE_META.length);
    expect(distinctCount(canonicals)).toBe(ALL_PAGE_META.length);
  });

  it('names the founder on the about page only', () => {
    const otherPages = ALL_PAGE_META.filter((meta: PageMeta) => meta.id !== 'about');

    expect(PAGE_META.about.title).toContain(FOUNDER.name);
    for (const meta of otherPages) {
      expect(`${meta.title} ${meta.description}`).not.toContain(FOUNDER.name);
    }
  });
});

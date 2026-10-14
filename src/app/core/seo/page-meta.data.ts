import { FOUNDER } from '../site/founder.data';
import { PageId } from '../site/page-id';
import { BUSINESS_NAME, SITE_URL } from '../site/site.config';
import { PageMeta } from './page-meta.model';

function withBusinessName(pagePhrase: string): string {
  return `${pagePhrase} | ${BUSINESS_NAME}`;
}

/**
 * One record per route. Wording is marketing's accepted copy (copy.md, section a); the case study
 * and the two Snapshot descriptions are the site-offer-update search spec (sections 2.1 and 5).
 */
export const PAGE_META: Readonly<Record<PageId, PageMeta>> = {
  home: {
    id: 'home',
    path: '',
    title: `${BUSINESS_NAME}: Websites and DevSecOps on AWS`,
    description: `${BUSINESS_NAME} builds new websites, improves existing ones and provides DevSecOps consulting on AWS. Remote service, available worldwide.`,
    breadcrumbLabel: 'Home',
  },
  'website-creation': {
    id: 'website-creation',
    path: 'website-creation',
    title: withBusinessName('Website Creation for Businesses'),
    description: `Website creation from ${BUSINESS_NAME}: a new business website planned, built and launched for your brand, ready for search engines and for enquiries.`,
    breadcrumbLabel: 'Website creation',
  },
  'website-improvement': {
    id: 'website-improvement',
    path: 'website-improvement',
    title: withBusinessName('Website Improvement in Three Tiers'),
    description:
      'Website improvement in three tiers, Basic, Professional and Enterprise, or start small with a Website Snapshot: a short review with your top 10 findings.',
    breadcrumbLabel: 'Website improvement',
  },
  'devsecops-consulting': {
    id: 'devsecops-consulting',
    path: 'devsecops-consulting',
    title: withBusinessName('DevSecOps Consulting on AWS'),
    description:
      'DevSecOps consulting on AWS: a review of how you build, ship and run software, or start with an AWS Security Snapshot of one account, read-only.',
    breadcrumbLabel: 'DevSecOps consulting',
  },
  about: {
    id: 'about',
    path: 'about',
    title: `About ${BUSINESS_NAME} and Founder ${FOUNDER.name}`,
    description: `About ${BUSINESS_NAME}, a remote web and DevSecOps services business founded by ${FOUNDER.name}. Background, AWS focus and the tools we work with.`,
    breadcrumbLabel: 'About',
  },
  'case-study-own-site': {
    id: 'case-study-own-site',
    path: 'case-studies/own-site-rebuild',
    title: withBusinessName('Case Study: Rebuilding Our Own Website'),
    description:
      'How we ran our own site through our website improvement process: audit, acceptance criteria, rebuild and independent testing, with what we measured.',
    breadcrumbLabel: 'Case study: our own website',
    ogType: 'article',
    publishedDate: '2026-10-14',
    headline: `${BUSINESS_NAME}: improving our own website, before and after`,
  },
};

export const ALL_PAGE_META: readonly PageMeta[] = Object.values(PAGE_META);

export function isPageId(value: unknown): value is PageId {
  return typeof value === 'string' && Object.hasOwn(PAGE_META, value);
}

/** Absolute URL of a route, always with a trailing slash. */
export function canonicalUrl(meta: PageMeta): string {
  if (meta.path === '') {
    return SITE_URL;
  }
  return `${SITE_URL}${meta.path}/`;
}

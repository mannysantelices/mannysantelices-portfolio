import { MetaDefinition } from '@angular/platform-browser';

import { BUSINESS_NAME, SITE_URL, SOCIAL_IMAGE } from '../site/site.config';
import { PageMeta } from './page-meta.model';

const ROBOTS_CONTENT: string = 'index, follow';
const TWITTER_CARD: string = 'summary_large_image';

function openGraphTags(meta: PageMeta, canonical: string, imageUrl: string): MetaDefinition[] {
  return [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: BUSINESS_NAME },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: String(SOCIAL_IMAGE.width) },
    { property: 'og:image:height', content: String(SOCIAL_IMAGE.height) },
    { property: 'og:image:type', content: SOCIAL_IMAGE.type },
    { property: 'og:image:alt', content: SOCIAL_IMAGE.alt },
  ];
}

function twitterTags(meta: PageMeta, imageUrl: string): MetaDefinition[] {
  return [
    { name: 'twitter:card', content: TWITTER_CARD },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: SOCIAL_IMAGE.alt },
  ];
}

/** Every per-route meta tag except the title, the canonical link and the JSON-LD. */
export function buildMetaTags(meta: PageMeta, canonical: string): MetaDefinition[] {
  const imageUrl = `${SITE_URL}${SOCIAL_IMAGE.path}`;
  return [
    { name: 'description', content: meta.description },
    { name: 'robots', content: ROBOTS_CONTENT },
    ...openGraphTags(meta, canonical, imageUrl),
    ...twitterTags(meta, imageUrl),
  ];
}

/** An empty value emits no tag at all: no placeholder verification tag may ship. */
export function buildVerificationTags(googleValue: string, bingValue: string): MetaDefinition[] {
  const tags: MetaDefinition[] = [];
  if (googleValue !== '') {
    tags.push({ name: 'google-site-verification', content: googleValue });
  }
  if (bingValue !== '') {
    tags.push({ name: 'msvalidate.01', content: bingValue });
  }
  return tags;
}

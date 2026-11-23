/** The single place for the business name, the site origin and the base path. */
export const BUSINESS_NAME: string = 'Santelices Systems';
export const SITE_ORIGIN: string = 'https://mannysantelices.github.io';
/** Must match the `--base-href` build flag in `.github/workflows/deploy.yml`. */
export const BASE_PATH: string = '/mannysantelices-portfolio/';
export const SITE_URL: string = `${SITE_ORIGIN}${BASE_PATH}`;

/** Shown in the footer on every route; `areaServed` in the structured data depends on it. */
export const REGION_LINE: string = 'Remote, worldwide';
export const AREA_SERVED: string = 'Worldwide';

/**
 * Where every "Book a call" link points: this fragment on the current route. When the owner
 * supplies a booking URL, change the link target here and in `BookCall` only.
 */
export const BOOK_CALL_FRAGMENT: string = 'contact';

/** Existing contact details. Add no other address. */
export const CONTACT_EMAIL: string = 'manny.santelices01@gmail.com';
export const LINKEDIN_URL: string = 'https://www.linkedin.com/in/manny-santelices-08a598163';
export const GITHUB_URL: string = 'https://github.com/mannysantelices';

export interface SocialImage {
  /** Path under the base path (file lives in `public/`). */
  readonly path: string;
  readonly width: number;
  readonly height: number;
  readonly type: string;
  /** Must describe what the image actually shows. */
  readonly alt: string;
}

/**
 * Brand v3 share image (visual-designer/brand/v3/png/share-image.png): logo mark, name and tagline.
 * `alt` must describe what the file really shows, so change both together.
 */
export const SOCIAL_IMAGE: SocialImage = {
  path: 'assets/social/santelices-systems-social-1200x630.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Santelices Systems logo, a pink angular S mark beside the name, with the tagline Build, Automate, Innovate on a dark background with pink diagonal stripes',
};

/**
 * Search-engine verification values, supplied by the owner. Empty means no tag is emitted.
 * Never ship a placeholder value here.
 */
export const GOOGLE_SITE_VERIFICATION: string = '';
export const BING_SITE_VERIFICATION: string = '';

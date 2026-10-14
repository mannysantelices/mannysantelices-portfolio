/** The single place for the business name, the site origin and the base path. */
export const BUSINESS_NAME: string = 'Santelices Systems';
export const SITE_ORIGIN: string = 'https://mannysantelices.github.io';
/** Must match the `--base-href` build flag in `.github/workflows/deploy.yml`. */
export const BASE_PATH: string = '/mannysantelices-portfolio/';
export const SITE_URL: string = `${SITE_ORIGIN}${BASE_PATH}`;

/** Shown in the footer on every route; `areaServed` in the structured data depends on it. */
export const REGION_LINE: string = 'Remote, worldwide';
export const AREA_SERVED: string = 'Worldwide';

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
 * INTERIM image: background, grid and frame only, with no text, name or logo artwork, because no
 * final artwork exists yet. When the final image replaces the file, change `alt` to marketing's
 * `social.alt` wording, and only if the artwork really shows what that wording says.
 */
export const SOCIAL_IMAGE: SocialImage = {
  path: 'assets/social/santelices-systems-social-1200x630.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Dark background with a fine grid and a thin rectangular frame with two pink corner marks',
};

/**
 * Search-engine verification values, supplied by the owner. Empty means no tag is emitted.
 * Never ship a placeholder value here.
 */
export const GOOGLE_SITE_VERIFICATION: string = '';
export const BING_SITE_VERIFICATION: string = '';

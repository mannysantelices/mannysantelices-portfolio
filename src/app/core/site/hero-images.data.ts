import { PageId } from './page-id';

/** Light artwork gets a raised frame in dark theme; dark artwork gets an inner outline in light. */
export type ImageTone = 'light' | 'dark';

/** One hero image, rendered as WebP with a JPEG fallback from `public/assets/img/`. */
export interface HeroImage {
  /** File prefix: `assets/img/<name>-<width>.webp|.jpg`. Also the CSS hook for aspect ratio. */
  readonly name: string;
  /** Rendition widths that exist on disk, smallest first. */
  readonly widths: readonly number[];
  /** Intrinsic size of the largest rendition used for layout (prevents layout shift). */
  readonly width: number;
  readonly height: number;
  readonly tone: ImageTone;
  /** Describes what the image shows; never claims it is the founder. */
  readonly alt: string;
}

export const HERO_IMAGE_SIZES: string =
  '(min-width: 1200px) 520px, (min-width: 860px) 45vw, calc(100vw - 40px)';

/** Owner-supplied images, cropped, blurred and encoded per the visual refresh specification. */
export const HERO_IMAGES: Readonly<Record<PageId, HeroImage>> = {
  home: {
    name: 'home',
    widths: [480, 800],
    width: 800,
    height: 600,
    tone: 'light',
    alt: 'Illustrative photo of a developer working at a standing desk in a bright home office, code on the monitor.',
  },
  'website-creation': {
    name: 'creation',
    widths: [480, 800, 1200, 1600],
    width: 1200,
    height: 900,
    tone: 'light',
    alt: 'Illustration of one website layout shown on a laptop, tablet and phone, with design tokens and component panels.',
  },
  'website-improvement': {
    name: 'improvement',
    widths: [480, 800, 1200, 1440],
    width: 1200,
    height: 750,
    tone: 'dark',
    alt: 'Illustrative workspace with code on a laptop, a site analytics dashboard and a heatmap on a tablet.',
  },
  'devsecops-consulting': {
    name: 'devsecops',
    widths: [480, 800, 1200],
    width: 1200,
    height: 800,
    tone: 'dark',
    alt: 'Illustration of a delivery pipeline: code, security scan, build, checks and cloud deployment.',
  },
  about: {
    name: 'about',
    widths: [480, 800, 1200],
    width: 1200,
    height: 753,
    tone: 'dark',
    alt: 'Illustrative desk setup with code on a monitor and a website shown on laptop, tablet and phone.',
  },
};

/** `srcset` for one format, e.g. `assets/img/home-480.webp 480w, ...`. */
export function heroSrcset(image: HeroImage, extension: 'webp' | 'jpg'): string {
  const entries: string[] = [];
  for (const width of image.widths) {
    entries.push(`assets/img/${image.name}-${width}.${extension} ${width}w`);
  }
  return entries.join(', ');
}

/** The JPEG used as `src` for browsers without `<picture>`/`srcset` support. */
export function heroFallbackSrc(image: HeroImage): string {
  return `assets/img/${image.name}-800.jpg`;
}

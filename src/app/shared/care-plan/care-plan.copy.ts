import { SectionCopy } from '../content.model';

/**
 * Marketing's site-offer-update copy deck, `care.*`, with the devops wording review applied to
 * `care.lede`, `care.item5` and `care.terms`, and the owner's response times. No working hours or
 * time zone are named anywhere.
 */
export const CARE_SECTION: SectionCopy = {
  id: 'care',
  tag: 'After launch',
  heading: 'Care plan: we look after your site each month',
};

export const CARE_LEDE: string =
  'For sites we built or improved. We keep the site hosted, updated and backed up, and tell you each month what we did.';

export const CARE_ITEMS: readonly string[] = [
  'Hosting management on AWS Lightsail in your region, or your own AWS account for Enterprise sites',
  'Monthly dependency and security updates',
  'Uptime checks, with alerts sent to us',
  'A monthly backup check and a test restore every quarter',
  'SSL/TLS certificate and domain expiry dates watched for you',
  'Up to 2 hours of small content edits each month (unused hours do not roll over)',
  'A short note each month on what we did',
];

export interface ResponseTime {
  readonly situation: string;
  readonly time: string;
}

export const CARE_RESPONSE_HEADING: string = 'How quickly we respond';

export const CARE_RESPONSE_TIMES: readonly ResponseTime[] = [
  { situation: 'Site down', time: 'We respond within 1 business day.' },
  {
    situation: 'Other requests',
    time: 'We respond within 2 business days and finish within 5.',
  },
];

export const CARE_TERMS: string =
  'Best effort, not 24/7 cover, and no uptime guarantee. Hosting charges are billed to your own AWS account. Minimum term 3 months, then 30 days notice. Planned leave is announced in advance.';

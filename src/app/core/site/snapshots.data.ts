import { PageId } from './page-id';

/** A fixed, small review offered as a first step. No price is shown or marked up anywhere. */
export interface Snapshot {
  /** Element id of its card on the service page, and the fragment of its JSON-LD `@id`. */
  readonly anchorId: string;
  /** The service page it belongs to. */
  readonly pageId: PageId;
  readonly title: string;
  /** Visible lede and the JSON-LD `description`, so they cannot drift. */
  readonly lede: string;
  readonly getItems: readonly string[];
  readonly time: string;
  readonly howBody: string;
  readonly credit: string;
  readonly limits?: string;
}

const CREDIT: string =
  'If you book a full engagement with us within 30 days, the Snapshot fee is credited against it.';

/**
 * Wording from marketing's site-offer-update copy deck (`start.web.*`, `start.aws.*`), with the
 * devops wording review applied to `start.aws.get.item3`, `item4`, `how.body` and `limits`.
 */
export const WEBSITE_SNAPSHOT: Snapshot = {
  anchorId: 'website-snapshot',
  pageId: 'website-improvement',
  title: 'Website Snapshot',
  lede: 'A quick, outside-in look at your public website.',
  getItems: [
    'A review of your public site: speed, security headers, metadata and an accessibility spot-check',
    'Your top 10 findings, in order of priority',
    'A recorded video walkthrough of what we found',
  ],
  time: 'Delivered within 3 business days',
  howBody:
    'Send us your site URL and answer a short questionnaire. We review only what is public, so we need no logins or access to your systems. You receive the findings and the video by email.',
  credit: CREDIT,
};

export const AWS_SECURITY_SNAPSHOT: Snapshot = {
  anchorId: 'aws-security-snapshot',
  pageId: 'devsecops-consulting',
  title: 'AWS Security Snapshot',
  lede: 'A read-only look at one AWS account, focused on the risks that matter most.',
  getItems: [
    'Access: root account, MFA, access keys and over-broad permissions',
    'Public exposure: storage buckets, security groups and public endpoints',
    'Logging and detection: CloudTrail, GuardDuty and Security Hub status in your regions',
    'Backups on your key data stores, and your top 5 cost lines from billing data',
    'A report with your top 10 findings, in priority order, and a 20 to 30 minute recorded video walkthrough',
  ],
  time: 'Delivered within 5 business days of access',
  howBody:
    'You fill in a short questionnaire and give written authorisation. We send a template for a read-only cross-account role (AWS-managed SecurityAudit and ViewOnlyAccess), which you create and can remove at any time. No access keys are shared. We look; we do not change anything.',
  credit: CREDIT,
  limits:
    'One AWS account and the regions you use. Pipelines and infrastructure code are in the full DevSecOps review.',
};

/** Both Snapshots, in display order. */
export const SNAPSHOTS: readonly Snapshot[] = [WEBSITE_SNAPSHOT, AWS_SECURITY_SNAPSHOT];

/** The Snapshot shown on a service page, if that page has one. */
export function snapshotFor(pageId: PageId): Snapshot | undefined {
  return SNAPSHOTS.find((snapshot: Snapshot) => snapshot.pageId === pageId);
}

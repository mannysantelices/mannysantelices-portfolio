import { FOUNDER } from '../../core/site/founder.data';
import { BUSINESS_NAME } from '../../core/site/site.config';
import { HeroCopy, SectionCopy } from '../../shared/content.model';

/** `/about/` wording from marketing's copy deck (`about.*`). The founder is named here only. */
export const ABOUT_HERO: HeroCopy = {
  pageId: 'about',
  h1: `About ${BUSINESS_NAME}`,
  lede: `${BUSINESS_NAME} is a remote web and DevSecOps services business founded by ${FOUNDER.name}. We build websites, improve existing ones and advise teams running software on AWS, for clients worldwide.`,
  primaryLabel: 'Get in touch',
  secondaryLabel: 'See our tools',
  secondaryFragment: 'tools',
};

export const ABOUT_BACKGROUND_SECTION: SectionCopy = {
  id: 'background',
  tag: 'Background',
  heading: `Founder: ${FOUNDER.name}`,
};

export const ABOUT_BACKGROUND_PARAGRAPHS: readonly string[] = [
  `${FOUNDER.name} is a software architect, DevOps engineer and web developer, and the founder of ${BUSINESS_NAME}. The business brings that work together as three services: website creation, website improvement and DevSecOps consulting.`,
  'AWS is the platform we know best. Our background covers back-end services, front-end applications, infrastructure as code, deployment pipelines and databases, so a website and the infrastructure under it can be looked at together: how it is hosted, how it is secured and what it costs to run.',
  'We use AI coding tools in our work. Every change is reviewed by a person for security, availability and cost before it is delivered. We work remotely and take on clients worldwide.',
];

/** The live site's wording, unchanged. Shown once on the whole site; never a link. */
export const ABOUT_CREDENTIAL: string = 'AWS Certified Developer';

export const ABOUT_TOOLS_SECTION: SectionCopy = {
  id: 'tools',
  tag: 'Tools',
  heading: 'Tools and platforms we work with',
  note: 'One list, grouped by where each tool sits. It is a list of what we use, not of partnerships.',
};

export const ABOUT_RELATED_SECTION: SectionCopy = {
  id: 'related',
  heading: 'Our services',
};

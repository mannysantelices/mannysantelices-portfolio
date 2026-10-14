import { SERVICES, ServiceSummary } from './services.data';

export interface NavLink {
  readonly label: string;
  /** Router path with a leading slash. */
  readonly path: string;
}

function toNavLink(service: ServiceSummary): NavLink {
  return { label: service.name, path: `/${service.path}` };
}

export const HOME_LINK: NavLink = { label: 'Home', path: '/' };
export const ABOUT_LINK: NavLink = { label: 'About', path: '/about' };

/** Header links, in order. The wordmark is the fifth destination (home). */
export const PRIMARY_NAV_LINKS: readonly NavLink[] = [...SERVICES.map(toNavLink), ABOUT_LINK];
export const FOOTER_NAV_LINKS: readonly NavLink[] = [HOME_LINK, ...PRIMARY_NAV_LINKS];

export const CONTACT_LABEL: string = 'Contact';
/** Fragment ids owned by the shell. Link to them as the current route plus the fragment. */
export const CONTACT_FRAGMENT: string = 'contact';
export const MAIN_FRAGMENT: string = 'main';

import { Routes } from '@angular/router';

import { PageId } from './core/site/page-id';
import { AboutPage } from './features/about/about-page';
import { DevsecopsConsultingPage } from './features/devsecops-consulting/devsecops-consulting-page';
import { HomePage } from './features/home/home-page';
import { WebsiteCreationPage } from './features/website-creation/website-creation-page';
import { WebsiteImprovementPage } from './features/website-improvement/website-improvement-page';

interface PageRouteData {
  readonly pageId: PageId;
}

function pageData(pageId: PageId): PageRouteData {
  return { pageId };
}

// No wildcard route: unknown paths are answered by the host's 404.html.
// Every path here is prerendered by the `**` rule in app.routes.server.ts.
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePage, data: pageData('home') },
  { path: 'website-creation', component: WebsiteCreationPage, data: pageData('website-creation') },
  {
    path: 'website-improvement',
    component: WebsiteImprovementPage,
    data: pageData('website-improvement'),
  },
  {
    path: 'devsecops-consulting',
    component: DevsecopsConsultingPage,
    data: pageData('devsecops-consulting'),
  },
  { path: 'about', component: AboutPage, data: pageData('about') },
];

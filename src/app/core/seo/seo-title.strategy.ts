import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { PageId } from '../site/page-id';
import { isPageId } from './page-meta.data';
import { SeoService } from './seo.service';

function findPageId(root: ActivatedRouteSnapshot): PageId | null {
  let route: ActivatedRouteSnapshot = root;
  while (route.firstChild) {
    route = route.firstChild;
  }
  const pageId: unknown = route.data['pageId'];
  if (isPageId(pageId)) {
    return pageId;
  }
  return null;
}

/** The router calls this after every successful navigation, at prerender and in the browser. */
@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageId = findPageId(snapshot.root);
    if (pageId) {
      this.seo.applyPage(pageId);
    }
  }
}

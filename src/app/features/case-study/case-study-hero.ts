import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PAGE_META } from '../../core/seo/page-meta.data';
import { HOME_LINK } from '../../core/site/nav.data';
import { BookCall } from '../../shared/book-call/book-call';
import { RichText } from '../../shared/rich-text/rich-text';
import { CASE_HERO } from './case-study.copy';

/** Text-only hero: no image is mapped to this page (ux spec section 3). */
@Component({
  selector: 'app-case-study-hero',
  imports: [RouterLink, BookCall, RichText],
  templateUrl: './case-study-hero.html',
})
export class CaseStudyHero {
  protected readonly copy = CASE_HERO;
  protected readonly homeLink = HOME_LINK;
  protected readonly breadcrumbLabel = PAGE_META['case-study-own-site'].breadcrumbLabel;
}

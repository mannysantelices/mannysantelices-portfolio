import { Component } from '@angular/core';

import { PageId } from '../../core/site/page-id';
import { BookCall } from '../../shared/book-call/book-call';
import { PageSection } from '../../shared/page-section/page-section';
import { RelatedServices } from '../../shared/related-services/related-services';
import { RichText } from '../../shared/rich-text/rich-text';
import {
  APPROACH_SECTION,
  APPROACH_STEPS,
  CHANGED_ITEMS,
  CHANGED_SECTION,
  PROBLEM_INTRO,
  PROBLEM_ITEMS,
  PROBLEM_SECTION,
  RELATED_SECTION,
} from './case-study.copy';
import {
  CLIENT_ITEMS,
  CLIENT_SECTION,
  CLIENT_SNAPSHOT_LINK,
  RESULTS_SECTION,
} from './case-study-results.copy';
import { CaseStudyHero } from './case-study-hero';
import { ResultsTable } from './results-table';

/** `/case-studies/own-site-rebuild/`: our own site, before and after. Composes; holds no logic. */
@Component({
  selector: 'app-case-study-page',
  imports: [BookCall, CaseStudyHero, PageSection, RelatedServices, ResultsTable, RichText],
  templateUrl: './case-study-page.html',
})
export class CaseStudyPage {
  protected readonly pageId: PageId = 'case-study-own-site';
  protected readonly problemSection = PROBLEM_SECTION;
  protected readonly problemIntro = PROBLEM_INTRO;
  protected readonly problemItems = PROBLEM_ITEMS;
  protected readonly approachSection = APPROACH_SECTION;
  protected readonly approachSteps = APPROACH_STEPS;
  protected readonly changedSection = CHANGED_SECTION;
  protected readonly changedItems = CHANGED_ITEMS;
  protected readonly resultsSection = RESULTS_SECTION;
  protected readonly clientSection = CLIENT_SECTION;
  protected readonly clientItems = CLIENT_ITEMS;
  protected readonly snapshotLink = CLIENT_SNAPSHOT_LINK;
  protected readonly relatedSection = RELATED_SECTION;
}

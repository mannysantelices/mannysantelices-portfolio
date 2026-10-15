import { Component } from '@angular/core';

import { CardGrid } from '../../shared/card-grid/card-grid';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PageSection } from '../../shared/page-section/page-section';
import { RelatedServices } from '../../shared/related-services/related-services';
import {
  ABOUT_BACKGROUND_PARAGRAPHS,
  ABOUT_BACKGROUND_SECTION,
  ABOUT_CREDENTIAL,
  ABOUT_HERO,
  ABOUT_RELATED_SECTION,
  ABOUT_TOOLS_SECTION,
} from './about.copy';
import { REMOTE_CARDS, REMOTE_FLOW_STEPS, REMOTE_FLOW_TITLE, REMOTE_SECTION } from './remote.copy';
import { ToolsList } from './tools-list';

/** `/about/`: background, how we work remotely, the single tools list, the three services. */
@Component({
  selector: 'app-about-page',
  imports: [CardGrid, PageHero, PageSection, RelatedServices, ToolsList],
  templateUrl: './about-page.html',
})
export class AboutPage {
  protected readonly hero = ABOUT_HERO;
  protected readonly backgroundSection = ABOUT_BACKGROUND_SECTION;
  protected readonly backgroundParagraphs = ABOUT_BACKGROUND_PARAGRAPHS;
  protected readonly credential = ABOUT_CREDENTIAL;
  protected readonly remoteSection = REMOTE_SECTION;
  protected readonly remoteCards = REMOTE_CARDS;
  protected readonly flowTitle = REMOTE_FLOW_TITLE;
  protected readonly flowSteps = REMOTE_FLOW_STEPS;
  protected readonly toolsSection = ABOUT_TOOLS_SECTION;
  protected readonly relatedSection = ABOUT_RELATED_SECTION;
}

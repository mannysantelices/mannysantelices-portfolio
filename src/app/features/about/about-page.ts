import { Component } from '@angular/core';

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
import { ToolsList } from './tools-list';

/** `/about/`: the founder's background, the single tools list, and the three services. */
@Component({
  selector: 'app-about-page',
  imports: [PageHero, PageSection, RelatedServices, ToolsList],
  templateUrl: './about-page.html',
})
export class AboutPage {
  protected readonly hero = ABOUT_HERO;
  protected readonly backgroundSection = ABOUT_BACKGROUND_SECTION;
  protected readonly backgroundParagraphs = ABOUT_BACKGROUND_PARAGRAPHS;
  protected readonly credential = ABOUT_CREDENTIAL;
  protected readonly toolsSection = ABOUT_TOOLS_SECTION;
  protected readonly relatedSection = ABOUT_RELATED_SECTION;
}

import { Component } from '@angular/core';

import { CardGrid } from '../../shared/card-grid/card-grid';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PageSection } from '../../shared/page-section/page-section';
import { RelatedServices } from '../../shared/related-services/related-services';
import { Steps } from '../../shared/steps/steps';
import { TierCards } from './tier-cards';
import {
  IMPROVE_AREAS_SECTION,
  IMPROVE_AREA_CARDS,
  IMPROVE_HERO,
  IMPROVE_RELATED_SECTION,
  IMPROVE_STEPS,
  IMPROVE_STEPS_LINK,
  IMPROVE_STEPS_SECTION,
  IMPROVE_TIERS_SECTION,
} from './website-improvement.copy';

/** `/website-improvement/`: what we improve, the three tiers, how it starts, related services. */
@Component({
  selector: 'app-website-improvement-page',
  imports: [CardGrid, PageHero, PageSection, RelatedServices, Steps, TierCards],
  templateUrl: './website-improvement-page.html',
})
export class WebsiteImprovementPage {
  protected readonly hero = IMPROVE_HERO;
  protected readonly areasSection = IMPROVE_AREAS_SECTION;
  protected readonly areaCards = IMPROVE_AREA_CARDS;
  protected readonly tiersSection = IMPROVE_TIERS_SECTION;
  protected readonly stepsSection = IMPROVE_STEPS_SECTION;
  protected readonly steps = IMPROVE_STEPS;
  protected readonly stepsLink = IMPROVE_STEPS_LINK;
  protected readonly relatedSection = IMPROVE_RELATED_SECTION;
}

import { Component } from '@angular/core';

import { WEBSITE_SNAPSHOT } from '../../core/site/snapshots.data';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { CarePlan } from '../../shared/care-plan/care-plan';
import { CARE_SECTION } from '../../shared/care-plan/care-plan.copy';
import { CaseCard } from '../../shared/case-card/case-card';
import { OfferCards } from '../../shared/offer-cards/offer-cards';
import { START_SECTION_SINGLE } from '../../shared/offer-cards/offer-cards.copy';
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
  IMPROVE_WORK_SECTION,
} from './website-improvement.copy';

/** `/website-improvement/`: areas, tiers, Snapshot, how it starts, case study, care plan, related. */
@Component({
  selector: 'app-website-improvement-page',
  imports: [
    CardGrid,
    CarePlan,
    CaseCard,
    OfferCards,
    PageHero,
    PageSection,
    RelatedServices,
    Steps,
    TierCards,
  ],
  templateUrl: './website-improvement-page.html',
})
export class WebsiteImprovementPage {
  protected readonly hero = IMPROVE_HERO;
  protected readonly areasSection = IMPROVE_AREAS_SECTION;
  protected readonly areaCards = IMPROVE_AREA_CARDS;
  protected readonly tiersSection = IMPROVE_TIERS_SECTION;
  protected readonly startSection = START_SECTION_SINGLE;
  protected readonly snapshots = [WEBSITE_SNAPSHOT];
  protected readonly stepsSection = IMPROVE_STEPS_SECTION;
  protected readonly steps = IMPROVE_STEPS;
  protected readonly stepsLink = IMPROVE_STEPS_LINK;
  protected readonly workSection = IMPROVE_WORK_SECTION;
  protected readonly careSection = CARE_SECTION;
  protected readonly relatedSection = IMPROVE_RELATED_SECTION;
}

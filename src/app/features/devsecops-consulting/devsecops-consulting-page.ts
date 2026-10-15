import { Component } from '@angular/core';

import { AWS_SECURITY_SNAPSHOT } from '../../core/site/snapshots.data';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { OfferCards } from '../../shared/offer-cards/offer-cards';
import { START_SECTION_SINGLE } from '../../shared/offer-cards/offer-cards.copy';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PageSection } from '../../shared/page-section/page-section';
import { RelatedServices } from '../../shared/related-services/related-services';
import { Steps } from '../../shared/steps/steps';
import {
  DEVSECOPS_HERO,
  DEVSECOPS_RECEIVE_CARDS,
  DEVSECOPS_RECEIVE_SECTION,
  DEVSECOPS_RELATED_SECTION,
  DEVSECOPS_REVIEW_CARDS,
  DEVSECOPS_REVIEW_SECTION,
  DEVSECOPS_STEPS,
  DEVSECOPS_STEPS_LINK,
  DEVSECOPS_STEPS_SECTION,
} from './devsecops-consulting.copy';

/** `/devsecops-consulting/`: review, Snapshot, what you receive, how it starts, related. */
@Component({
  selector: 'app-devsecops-consulting-page',
  imports: [CardGrid, OfferCards, PageHero, PageSection, RelatedServices, Steps],
  templateUrl: './devsecops-consulting-page.html',
})
export class DevsecopsConsultingPage {
  protected readonly hero = DEVSECOPS_HERO;
  protected readonly reviewSection = DEVSECOPS_REVIEW_SECTION;
  protected readonly reviewCards = DEVSECOPS_REVIEW_CARDS;
  protected readonly startSection = START_SECTION_SINGLE;
  protected readonly snapshots = [AWS_SECURITY_SNAPSHOT];
  protected readonly receiveSection = DEVSECOPS_RECEIVE_SECTION;
  protected readonly receiveCards = DEVSECOPS_RECEIVE_CARDS;
  protected readonly stepsSection = DEVSECOPS_STEPS_SECTION;
  protected readonly steps = DEVSECOPS_STEPS;
  protected readonly stepsLink = DEVSECOPS_STEPS_LINK;
  protected readonly relatedSection = DEVSECOPS_RELATED_SECTION;
}

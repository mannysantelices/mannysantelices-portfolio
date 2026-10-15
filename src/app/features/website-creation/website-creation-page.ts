import { Component } from '@angular/core';

import { CardGrid } from '../../shared/card-grid/card-grid';
import { CarePlan } from '../../shared/care-plan/care-plan';
import { CARE_SECTION } from '../../shared/care-plan/care-plan.copy';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PageSection } from '../../shared/page-section/page-section';
import { RelatedServices } from '../../shared/related-services/related-services';
import { Steps } from '../../shared/steps/steps';
import {
  CREATE_FOR_CARDS,
  CREATE_FOR_SECTION,
  CREATE_GET_CARDS,
  CREATE_GET_SECTION,
  CREATE_HERO,
  CREATE_RELATED_SECTION,
  CREATE_STEPS,
  CREATE_STEPS_LINK,
  CREATE_STEPS_SECTION,
} from './website-creation.copy';

/** `/website-creation/`: what you get, who it is for, how it starts, care plan, related. */
@Component({
  selector: 'app-website-creation-page',
  imports: [CardGrid, CarePlan, PageHero, PageSection, RelatedServices, Steps],
  templateUrl: './website-creation-page.html',
})
export class WebsiteCreationPage {
  protected readonly hero = CREATE_HERO;
  protected readonly getSection = CREATE_GET_SECTION;
  protected readonly getCards = CREATE_GET_CARDS;
  protected readonly forSection = CREATE_FOR_SECTION;
  protected readonly forCards = CREATE_FOR_CARDS;
  protected readonly stepsSection = CREATE_STEPS_SECTION;
  protected readonly steps = CREATE_STEPS;
  protected readonly stepsLink = CREATE_STEPS_LINK;
  protected readonly careSection = CARE_SECTION;
  protected readonly relatedSection = CREATE_RELATED_SECTION;
}

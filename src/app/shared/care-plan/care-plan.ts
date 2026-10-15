import { Component } from '@angular/core';

import {
  CARE_ITEMS,
  CARE_LEDE,
  CARE_RESPONSE_HEADING,
  CARE_RESPONSE_TIMES,
  CARE_TERMS,
} from './care-plan.copy';

/** The monthly care plan: what is included, and how quickly we respond. No price. */
@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.html',
})
export class CarePlan {
  protected readonly lede = CARE_LEDE;
  protected readonly items = CARE_ITEMS;
  protected readonly responseHeading = CARE_RESPONSE_HEADING;
  protected readonly responseTimes = CARE_RESPONSE_TIMES;
  protected readonly terms = CARE_TERMS;
}

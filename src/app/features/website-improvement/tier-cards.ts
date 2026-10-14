import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { CONTACT_FRAGMENT } from '../../core/site/nav.data';
import { BETWEEN_TIERS, IMPROVEMENT_TIERS, TIER_LABELS } from '../../core/site/tiers.data';

/** The three tier cards and the between-tiers note. No prices, and no tier is highlighted. */
@Component({
  selector: 'app-tier-cards',
  imports: [RouterLink],
  templateUrl: './tier-cards.html',
})
export class TierCards {
  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly contactFragment = CONTACT_FRAGMENT;
  protected readonly tiers = IMPROVEMENT_TIERS;
  protected readonly labels = TIER_LABELS;
  protected readonly between = BETWEEN_TIERS;
}

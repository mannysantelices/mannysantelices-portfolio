import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageId } from '../../core/site/page-id';
import { ServiceSummary, servicesOtherThan } from '../../core/site/services.data';

/** One card per service other than the current page's, each heading linking to its route. */
@Component({
  selector: 'app-related-services',
  imports: [RouterLink],
  templateUrl: './related-services.html',
})
export class RelatedServices {
  readonly currentPageId = input.required<PageId>();

  protected readonly services = computed<readonly ServiceSummary[]>(() =>
    servicesOtherThan(this.currentPageId()),
  );
}

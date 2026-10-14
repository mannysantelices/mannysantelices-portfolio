import { Component, computed, input } from '@angular/core';

import { SectionCopy } from '../content.model';

/**
 * A named page section: `<section>` labelled by its `h2`, with the optional tag and note.
 * The section is a fragment target, so it carries `tabindex="-1"`. Content is projected.
 */
@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.html',
})
export class PageSection {
  readonly copy = input.required<SectionCopy>();

  protected readonly headingId = computed<string>(() => `${this.copy().id}-h`);
}

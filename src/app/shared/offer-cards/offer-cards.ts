import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PAGE_META } from '../../core/seo/page-meta.data';
import { Snapshot } from '../../core/site/snapshots.data';
import { BookCall } from '../book-call/book-call';
import { OFFER_LABELS } from './offer-cards.copy';

/**
 * The Snapshot offer cards and one "Book a call" below them. With `linkTitles`, each title links
 * to the Snapshot's card on its service page (home); otherwise the card is that link's target.
 */
@Component({
  selector: 'app-offer-cards',
  imports: [RouterLink, BookCall],
  templateUrl: './offer-cards.html',
})
export class OfferCards {
  readonly snapshots = input.required<readonly Snapshot[]>();
  readonly linkTitles = input<boolean>(false);

  protected readonly labels = OFFER_LABELS;

  protected pathOf(snapshot: Snapshot): string {
    return `/${PAGE_META[snapshot.pageId].path}`;
  }
}

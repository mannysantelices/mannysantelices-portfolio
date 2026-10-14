import { Component, input } from '@angular/core';

import { CardColumns, ContentCard } from '../content.model';

/** A bordered grid of plain cards: heading, then a paragraph, a list of points, or both. */
@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.html',
})
export class CardGrid {
  readonly cards = input.required<readonly ContentCard[]>();
  readonly columns = input<CardColumns>(2);
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CASE_STUDY_LINK } from '../../core/site/nav.data';
import { CASE_CARD } from './case-card.copy';

/** One wide card that links to the case study. Only the text link is a focus stop. */
@Component({
  selector: 'app-case-card',
  imports: [RouterLink],
  templateUrl: './case-card.html',
})
export class CaseCard {
  protected readonly copy = CASE_CARD;
  protected readonly path = CASE_STUDY_LINK.path;
}

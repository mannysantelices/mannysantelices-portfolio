import { Component } from '@angular/core';

import {
  RESULTS_CAPTION,
  RESULTS_COLUMNS,
  RESULTS_INTRO,
  RESULTS_NOT_MEASURED,
  RESULTS_ROWS,
} from './case-study-results.copy';

/** The measured results as a real table, with what was not measured underneath. */
@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.html',
})
export class ResultsTable {
  protected readonly intro = RESULTS_INTRO;
  protected readonly caption = RESULTS_CAPTION;
  protected readonly columns = RESULTS_COLUMNS;
  protected readonly rows = RESULTS_ROWS;
  protected readonly notMeasured = RESULTS_NOT_MEASURED;
}

import { Component } from '@angular/core';

import { TOOL_ROWS } from '../../core/site/tools.data';

const INDEX_DIGITS: number = 2;

/** The single tools list: one row per group, each tool named once as a plain chip. */
@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.html',
})
export class ToolsList {
  protected readonly rows = TOOL_ROWS;

  /** Decorative row number, for example `01`. Hidden from assistive technology. */
  protected rowNumber(index: number): string {
    return String(index + 1).padStart(INDEX_DIGITS, '0');
  }
}

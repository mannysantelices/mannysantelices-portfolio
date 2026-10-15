import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { BOOK_CALL_FRAGMENT } from '../../core/site/site.config';
import { BOOK_CALL_LABEL } from './book-call.copy';

/** The primary "Book a call" button. Its target is `BOOK_CALL_FRAGMENT` on the current route. */
@Component({
  selector: 'app-book-call',
  imports: [RouterLink],
  template: `<a class="btn btn-primary" [routerLink]="currentPath()" [fragment]="fragment">{{
    label
  }}</a>`,
})
export class BookCall {
  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly fragment = BOOK_CALL_FRAGMENT;
  protected readonly label = BOOK_CALL_LABEL;
}

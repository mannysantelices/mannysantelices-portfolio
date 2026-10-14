import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SERVICE_CARDS } from './service-cards.data';

/** The three service cards on the home page; each heading links to its service route. */
@Component({
  selector: 'app-service-cards',
  imports: [RouterLink],
  templateUrl: './service-cards.html',
})
export class ServiceCards {
  protected readonly cards = SERVICE_CARDS;
}

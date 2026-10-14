import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CurrentRouteService } from '../../core/navigation/current-route.service';
import { CONTACT_FRAGMENT } from '../../core/site/nav.data';
import { Step } from '../content.model';

/** "How it starts": an ordered list of steps; the last one links to the contact section. */
@Component({
  selector: 'app-steps',
  imports: [RouterLink],
  templateUrl: './steps.html',
})
export class Steps {
  readonly steps = input.required<readonly Step[]>();
  readonly contactLinkLabel = input.required<string>();

  protected readonly currentPath = inject(CurrentRouteService).path;
  protected readonly contactFragment = CONTACT_FRAGMENT;
}

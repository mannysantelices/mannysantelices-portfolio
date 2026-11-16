import { Component } from '@angular/core';

import { HOME_PANEL } from './home.copy';

/** Illustrated four-step project outline that replaces the photo in the home hero. */
@Component({
  selector: 'app-hero-panel',
  templateUrl: './hero-panel.html',
})
export class HeroPanel {
  protected readonly panel = HOME_PANEL;
}

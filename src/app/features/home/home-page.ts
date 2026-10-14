import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ABOUT_LINK } from '../../core/site/nav.data';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PageSection } from '../../shared/page-section/page-section';
import {
  HOME_ABOUT,
  HOME_ABOUT_SECTION,
  HOME_HERO,
  HOME_HOW_CARDS,
  HOME_HOW_SECTION,
  HOME_SERVICES_SECTION,
} from './home.copy';
import { ServiceCards } from './service-cards';

/** Home page: hero, the three services, how we work, about teaser. Composes; holds no logic. */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CardGrid, PageHero, PageSection, ServiceCards],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly hero = HOME_HERO;
  protected readonly servicesSection = HOME_SERVICES_SECTION;
  protected readonly howSection = HOME_HOW_SECTION;
  protected readonly howCards = HOME_HOW_CARDS;
  protected readonly aboutSection = HOME_ABOUT_SECTION;
  protected readonly about = HOME_ABOUT;
  protected readonly aboutPath = ABOUT_LINK.path;
}

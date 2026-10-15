import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ABOUT_LINK } from '../../core/site/nav.data';
import { SNAPSHOTS } from '../../core/site/snapshots.data';
import { CardGrid } from '../../shared/card-grid/card-grid';
import { CaseCard } from '../../shared/case-card/case-card';
import { OfferCards } from '../../shared/offer-cards/offer-cards';
import { START_SECTION } from '../../shared/offer-cards/offer-cards.copy';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PageSection } from '../../shared/page-section/page-section';
import { REMOTE_SECTION } from '../about/remote.copy';
import {
  HOME_ABOUT,
  HOME_ABOUT_SECTION,
  HOME_HERO,
  HOME_HOW_CARDS,
  HOME_HOW_SECTION,
  HOME_REMOTE_LINK,
  HOME_SERVICES_SECTION,
  HOME_WORK_SECTION,
} from './home.copy';
import { ServiceCards } from './service-cards';

/** Home: hero, services, Snapshots, how we work, case study, about teaser. Composes only. */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CardGrid, CaseCard, OfferCards, PageHero, PageSection, ServiceCards],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly hero = HOME_HERO;
  protected readonly servicesSection = HOME_SERVICES_SECTION;
  protected readonly startSection = START_SECTION;
  protected readonly snapshots = SNAPSHOTS;
  protected readonly howSection = HOME_HOW_SECTION;
  protected readonly howCards = HOME_HOW_CARDS;
  protected readonly remoteLink = HOME_REMOTE_LINK;
  protected readonly remoteFragment = REMOTE_SECTION.id;
  protected readonly workSection = HOME_WORK_SECTION;
  protected readonly aboutSection = HOME_ABOUT_SECTION;
  protected readonly about = HOME_ABOUT;
  protected readonly aboutPath = ABOUT_LINK.path;
}

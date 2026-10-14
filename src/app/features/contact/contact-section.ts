import { Component } from '@angular/core';

import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../core/site/site.config';
import { ContactForm } from './contact-form';

/** The shared contact section: last child of `<main>` on every route. There is no `/contact/`. */
@Component({
  selector: 'app-contact-section',
  imports: [ContactForm],
  templateUrl: './contact-section.html',
})
export class ContactSection {
  protected readonly mailtoHref = `mailto:${CONTACT_EMAIL}`;
  protected readonly linkedinUrl = LINKEDIN_URL;
  protected readonly githubUrl = GITHUB_URL;
}

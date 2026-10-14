import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { JsonLdGraph } from './structured-data.model';

const JSON_LD_TYPE: string = 'application/ld+json';

/** Keeps exactly one JSON-LD script in the head: created at prerender, reused after hydration. */
@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);

  apply(graph: JsonLdGraph): void {
    const script = this.findOrCreateScript();
    // "<" is escaped so no value can ever close the script element.
    script.textContent = JSON.stringify(graph).replaceAll('<', '\\u003c');
  }

  private findOrCreateScript(): HTMLScriptElement {
    const head = this.document.head;
    const existing = head.querySelector<HTMLScriptElement>(`script[type="${JSON_LD_TYPE}"]`);
    if (existing) {
      return existing;
    }
    const script = this.document.createElement('script');
    script.setAttribute('type', JSON_LD_TYPE);
    head.appendChild(script);
    return script;
  }
}

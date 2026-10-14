import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  LinkSegment,
  RichSegment,
  RichText as RichTextModel,
  StrongSegment,
} from '../content.model';

/** Renders a run of text segments inline (inside the host's own `<p>` or `<li>`). */
@Component({
  selector: 'app-rich-text',
  imports: [RouterLink],
  templateUrl: './rich-text.html',
})
export class RichText {
  readonly segments = input.required<RichTextModel>();

  protected textOf(segment: RichSegment): string | null {
    if (typeof segment === 'string') {
      return segment;
    }
    return null;
  }

  protected strongOf(segment: RichSegment): StrongSegment | null {
    if (typeof segment !== 'string' && 'strong' in segment) {
      return segment;
    }
    return null;
  }

  protected linkOf(segment: RichSegment): LinkSegment | null {
    if (typeof segment !== 'string' && 'link' in segment) {
      return segment;
    }
    return null;
  }
}

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, Injector, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

const PENDING_SELECTOR: string = '.reveal:not(.in)';
const REVEALED_CLASS: string = 'in';
/** The hidden start state exists in CSS only under this class, so no script means no hiding. */
const READY_CLASS: string = 'reveal-ready';
const FALLBACK_MS: number = 2000;

/** Scroll reveal for `.reveal` blocks. Content stays visible unless everything it needs exists. */
@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer: IntersectionObserver | null = null;

  start(): void {
    if (!this.isBrowser || !this.canAnimate()) {
      return;
    }
    this.router.events.subscribe((event: unknown) => {
      if (event instanceof NavigationEnd) {
        this.scheduleReveal();
      }
    });
    this.scheduleReveal();
  }

  private scheduleReveal(): void {
    afterNextRender(() => this.revealPending(), { injector: this.injector });
  }

  private canAnimate(): boolean {
    const view = this.document.defaultView;
    if (!view || typeof IntersectionObserver !== 'function') {
      return false;
    }
    if (typeof view.matchMedia !== 'function') {
      return false;
    }
    return !view.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private revealPending(): void {
    const observer = this.getObserver();
    const viewportHeight = this.document.defaultView?.innerHeight ?? 0;
    // Elements already on screen are revealed before the hidden state is switched on: no blink.
    this.document.querySelectorAll(PENDING_SELECTOR).forEach((element: Element) => {
      if (element.getBoundingClientRect().top < viewportHeight) {
        element.classList.add(REVEALED_CLASS);
      } else {
        observer.observe(element);
      }
    });
    this.document.documentElement.classList.add(READY_CLASS);
    // Safety net: never leave content invisible if intersection never fires.
    setTimeout(() => this.revealAll(), FALLBACK_MS);
  }

  private revealAll(): void {
    // Re-query: nodes captured earlier can be stale after hydration or a page change.
    this.document.querySelectorAll(PENDING_SELECTOR).forEach((element: Element) => {
      element.classList.add(REVEALED_CLASS);
      this.observer?.unobserve(element);
    });
  }

  private getObserver(): IntersectionObserver {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => this.onIntersect(entries),
        { threshold: 0.12 },
      );
    }
    return this.observer;
  }

  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add(REVEALED_CLASS);
        this.observer?.unobserve(entry.target);
      }
    }
  }
}

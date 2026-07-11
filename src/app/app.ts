import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, Renderer2, afterNextRender, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

const SITE_URL = 'https://mannysantelices.github.io/mannysantelices-portfolio/';
const SITE_TITLE = 'Manny Santelices, Software Architect and DevOps Engineer';
const SITE_DESCRIPTION =
  'Manny Santelices is a software architect, DevOps engineer, and web developer running an AI-native practice with Claude Code and Codex, specializing in Node.js, TypeScript, Angular, PHP, and AWS cloud infrastructure, with a practice built around DevSecFinOps.';

// EmailJS keys are public by design (client-side send, rate-limited per account) — safe to ship in the bundle.
const EMAILJS_SERVICE_ID = 'service_lv1kk7h';
const EMAILJS_TEMPLATE_ID = 'template_xrvhifc';
const EMAILJS_PUBLIC_KEY = '-5ERXyNbq1UevCa8i';

type SendState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  protected readonly isDark = signal(false);
  protected readonly sendState = signal<SendState>('idle');

  constructor() {
    this.setSeoTags();
    this.initTheme();
    afterNextRender(() => this.setUpScrollReveal());
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const next = this.isDark() ? 'light' : 'dark';
    this.document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this.isDark.set(next === 'dark');
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Honeypot: real users never fill this hidden field; bots that auto-fill every field do.
    const honeypot = new FormData(form).get('company');
    if (honeypot) {
      this.sendState.set('sent');
      form.reset();
      return;
    }

    this.sendState.set('sending');

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        this.sendState.set('sent');
        form.reset();
      })
      .catch(() => this.sendState.set('error'));
  }

  private setUpScrollReveal(): void {
    const revealAll = () => this.document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));

    if (typeof IntersectionObserver !== 'function') {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    this.document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Safety net: never leave content invisible if intersection never fires.
    setTimeout(() => {
      revealAll();
      io.disconnect();
    }, 2000);
  }

  private initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      this.document.documentElement.setAttribute('data-theme', stored);
      this.isDark.set(stored === 'dark');
      return;
    }
    if (typeof window.matchMedia === 'function') {
      this.isDark.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  private setSeoTags(): void {
    this.titleService.setTitle(SITE_TITLE);
    this.metaService.addTags([
      { name: 'description', content: SITE_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: `${SITE_URL}assets/logos/logo-horizontal-white.png` },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
    ]);

    const canonical = this.renderer.createElement('link');
    this.renderer.setAttribute(canonical, 'rel', 'canonical');
    this.renderer.setAttribute(canonical, 'href', SITE_URL);
    this.renderer.appendChild(this.document.head, canonical);

    const jsonLd = this.renderer.createElement('script');
    this.renderer.setAttribute(jsonLd, 'type', 'application/ld+json');
    jsonLd.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Manny Santelices',
      jobTitle: 'Software Architect, DevOps Engineer & Web Developer',
      url: SITE_URL,
      email: 'mailto:manny.santelices01@gmail.com',
      sameAs: [
        'https://github.com/mannysantelices',
        'https://www.linkedin.com/in/manny-santelices-08a598163',
      ],
      knowsAbout: [
        'Node.js',
        'TypeScript',
        'Angular',
        'PHP',
        'AWS',
        'DevOps',
        'DevSecFinOps',
        'Cloud Architecture',
        'Claude Code',
        'Codex',
        'Agentic AI Development',
      ],
    });
    this.renderer.appendChild(this.document.head, jsonLd);
  }
}

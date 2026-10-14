import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService with blocked storage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  it('starts and still toggles the theme when storage throws', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    });
    document.documentElement.setAttribute('data-theme', 'light');
    const service = TestBed.inject(ThemeService);

    expect(() => service.toggle()).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(service.isDark()).toBe(true);
  });
});

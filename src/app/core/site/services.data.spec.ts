import { SERVICES, ServiceSummary, servicesOtherThan } from './services.data';

const MAX_RELATED_LINE_LENGTH: number = 100;

function idsOf(services: readonly ServiceSummary[]): readonly string[] {
  return services.map((service: ServiceSummary) => service.id);
}

describe('services data', () => {
  it('gives every service a related line inside its limit', () => {
    for (const service of SERVICES) {
      expect(service.relatedLine.length).toBeGreaterThan(0);
      expect(service.relatedLine.length).toBeLessThanOrEqual(MAX_RELATED_LINE_LENGTH);
    }
  });

  it('leaves the current service out of its own related list', () => {
    expect(idsOf(servicesOtherThan('website-creation'))).toEqual([
      'website-improvement',
      'devsecops-consulting',
    ]);
    expect(idsOf(servicesOtherThan('devsecops-consulting'))).toEqual([
      'website-creation',
      'website-improvement',
    ]);
  });

  it('returns all three services for a page that is not a service', () => {
    expect(servicesOtherThan('about').length).toBe(SERVICES.length);
    expect(servicesOtherThan('home').length).toBe(SERVICES.length);
  });
});

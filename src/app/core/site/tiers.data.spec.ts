import { IMPROVEMENT_TIER_NAMES } from './services.data';
import { IMPROVEMENT_TIERS, ImprovementTier } from './tiers.data';

describe('improvement tiers', () => {
  it('lists Basic, Professional and Enterprise in that order', () => {
    const names = IMPROVEMENT_TIERS.map((tier: ImprovementTier) => tier.name);

    expect(names).toEqual(['Basic', 'Professional', 'Enterprise']);
    expect(names).toEqual([...IMPROVEMENT_TIER_NAMES]);
  });

  it('gives every tier a summary, an audience and a link label naming the tier', () => {
    for (const tier of IMPROVEMENT_TIERS) {
      expect(tier.summary.length).toBeGreaterThan(0);
      expect(tier.audience.length).toBeGreaterThan(0);
      expect(tier.linkLabel).toContain(tier.name);
    }
  });
});

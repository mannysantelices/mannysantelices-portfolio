import { IMPROVEMENT_TIER_NAMES } from './services.data';
import { IMPROVEMENT_TIERS, ImprovementTier } from './tiers.data';

describe('improvement tiers', () => {
  it('lists Basic, Professional and Enterprise in that order', () => {
    const names = IMPROVEMENT_TIERS.map((tier: ImprovementTier) => tier.name);

    expect(names).toEqual(['Basic', 'Professional', 'Enterprise']);
    expect(names).toEqual([...IMPROVEMENT_TIER_NAMES]);
  });

  it('gives every tier a summary, four scope items, a time and a link label naming the tier', () => {
    for (const tier of IMPROVEMENT_TIERS) {
      expect(tier.summary.length).toBeGreaterThan(0);
      expect(tier.scope.length).toBe(4);
      expect(tier.time.length).toBeGreaterThan(0);
      expect(tier.linkLabel).toContain(tier.name);
    }
  });
});

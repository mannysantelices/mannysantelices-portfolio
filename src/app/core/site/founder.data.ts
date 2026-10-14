/** The founder is named on `/about/` only (brief decision Q1). Nothing outside that route reads this. */
export interface Founder {
  readonly name: string;
  readonly jobTitle: string;
  /** Every entry must be in the visible text of `/about/`. */
  readonly knowsAbout: readonly string[];
}

export const FOUNDER: Founder = {
  name: 'Manny Santelices',
  jobTitle: 'Founder',
  knowsAbout: ['AWS', 'DevSecOps', 'Website creation', 'Website improvement'],
};

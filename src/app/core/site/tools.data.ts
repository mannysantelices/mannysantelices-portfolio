/** One row of the tools list on `/about/`: a group label and its chips. */
export interface ToolRow {
  readonly label: string;
  readonly tools: readonly string[];
}

/**
 * The only tools list on the site. A name appears once, in one row. It is a plain list of what
 * we use: no AI tool brand, and no payment provider (brief criterion 26f bars those names).
 */
export const TOOL_ROWS: readonly ToolRow[] = [
  {
    label: 'Cloud and infrastructure',
    tools: ['AWS', 'AWS CDK', 'CloudFormation', 'Sceptre', 'Serverless Framework'],
  },
  {
    label: 'Pipelines and operations',
    tools: [
      'GitHub Actions',
      'AWS CodePipeline',
      'SaltStack',
      'Spot (formerly Spotinst)',
      'Bash',
      'Ubuntu / Linux Server',
    ],
  },
  { label: 'Backend', tools: ['Node.js', 'Python', 'PHP', 'Zend Framework'] },
  { label: 'Frontend', tools: ['TypeScript', 'JavaScript', 'Angular', 'HTML', 'CSS'] },
  { label: 'Databases', tools: ['MySQL', 'PostgreSQL', 'SQL'] },
  {
    label: 'Third-party services',
    tools: ['Google Address API', 'Google Tag Manager', 'Google Analytics', 'Google Ads'],
  },
];

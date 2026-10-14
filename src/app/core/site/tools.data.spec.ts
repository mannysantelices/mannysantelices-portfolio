import { TOOL_ROWS, ToolRow } from './tools.data';

const MAX_ROWS: number = 6;
const MAX_TOOLS_PER_ROW: number = 8;
const MAX_LABEL_LENGTH: number = 32;
const MAX_TOOL_LENGTH: number = 24;
const BARRED_NAMES: RegExp =
  /\b(GCP|TPP|Noun Project|DBeaver|Claude|ChatGPT|Codex|Stripe|eWAY|Pin Payments|PayPal)\b/i;

describe('tools list data', () => {
  const allTools: readonly string[] = TOOL_ROWS.flatMap((row: ToolRow) => row.tools);

  it('has at most six rows of at most eight tools', () => {
    expect(TOOL_ROWS.length).toBeLessThanOrEqual(MAX_ROWS);
    for (const row of TOOL_ROWS) {
      expect(row.tools.length).toBeGreaterThan(0);
      expect(row.tools.length).toBeLessThanOrEqual(MAX_TOOLS_PER_ROW);
    }
  });

  it('keeps labels and tool names inside their length limits', () => {
    for (const row of TOOL_ROWS) {
      expect(row.label.length).toBeLessThanOrEqual(MAX_LABEL_LENGTH);
    }
    for (const tool of allTools) {
      expect(tool.length).toBeLessThanOrEqual(MAX_TOOL_LENGTH);
    }
  });

  it('names each tool once', () => {
    const lowerCased = allTools.map((tool: string) => tool.toLowerCase());

    expect(new Set(lowerCased).size).toBe(lowerCased.length);
  });

  it('lists no barred tool, AI tool brand or payment provider', () => {
    for (const tool of allTools) {
      expect(tool).not.toMatch(BARRED_NAMES);
    }
  });
});

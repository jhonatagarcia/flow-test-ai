import type { RecorderStep, SampleUIItem } from "@/lib/types";

export const SAMPLE_UI_ITEMS: SampleUIItem[] = [
  { id: "btn-login", label: "Clicar em Entrar" },
  { id: "input-email", label: "Preencher email" },
  { id: "input-pass", label: "Preencher senha" },
  { id: "btn-submit", label: "Submit" },
];

export function createRecorderStep(item: SampleUIItem): RecorderStep {
  return {
    ts: Date.now(),
    action: item.label,
    selector: `#${item.id}`,
  };
}

export function buildPlaywrightSnippet(steps: RecorderStep[]): string {
  const lines = [
    "import { test, expect } from '@playwright/test';",
    "",
    "test('recorded flow', async ({ page }) => {",
    ...steps.map(
      (step) =>
        `  // ${new Date(step.ts).toLocaleTimeString()} - ${step.action}\n  await page.click('${step.selector}');`,
    ),
    "});",
  ];

  return lines.join("\n");
}

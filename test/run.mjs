#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(testDir, "..");
const configPath = join(testDir, "biome.test.json");
const biomeBin = join(
  repoRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "biome.cmd" : "biome"
);

/*
 * One case per rule: a stable substring of the rule's diagnostic message, an
 * `.invalid.ts` fixture that MUST trigger it, and a `.valid.ts` fixture that
 * MUST NOT. Matching on a substring (rather than the full message) keeps the
 * test resilient to wording tweaks while still binding each fixture to its rule.
 */
const cases = [
  { rule: "no-as-unknown-as", needle: "Double assertions through" },
  {
    rule: "no-empty-object-accumulator",
    needle: "reducer accumulator",
  },
  { rule: "no-has-own-property", needle: "hasOwnProperty()" },
  { rule: "no-in-operator", needle: "prototype-chain property checks" },
  {
    rule: "no-object-assign-target",
    needle: "Object.assign({}, ...)",
  },
  { rule: "no-object-from-entries", needle: "Object.fromEntries()" },
  { rule: "no-prototype-mutation", needle: "setPrototypeOf()" },
  {
    rule: "no-prototype-property-access",
    needle: "direct prototype access",
  },
  {
    rule: "prefer-object-parameter",
    needle: "single object argument with named parameters",
  },
];

function lintFixtures() {
  let stdout;
  try {
    stdout = execFileSync(
      biomeBin,
      ["lint", `--config-path=${configPath}`, "--reporter=json", "fixtures"],
      {
        cwd: testDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }
    );
  } catch (error) {
    // Biome exits non-zero whenever diagnostics are present; the JSON we need is
    // still on stdout. Only a missing/empty stdout is a real failure.
    stdout = error.stdout;
    if (!stdout) {
      throw error;
    }
  }
  return JSON.parse(stdout).diagnostics ?? [];
}

const pluginDiagnostics = lintFixtures().filter((d) => d.category === "plugin");

function pluginMessagesFor(fixture) {
  return pluginDiagnostics
    .filter((d) => d.location?.path?.endsWith(fixture))
    .map((d) => d.message);
}

const failures = [];

for (const { rule, needle } of cases) {
  const invalid = `${rule}.invalid.ts`;
  const valid = `${rule}.valid.ts`;

  const invalidMessages = pluginMessagesFor(invalid);
  if (!invalidMessages.some((m) => m.includes(needle))) {
    failures.push(
      `${rule}: expected "${invalid}" to report a plugin diagnostic containing "${needle}", ` +
        `but got: ${JSON.stringify(invalidMessages)}`
    );
  }

  const validMessages = pluginMessagesFor(valid);
  if (validMessages.length > 0) {
    failures.push(
      `${rule}: expected "${valid}" to report no plugin diagnostics, but got: ${JSON.stringify(validMessages)}`
    );
  }
}

if (failures.length > 0) {
  console.error(
    `✗ Rule tests failed:\n${failures.map((f) => `  - ${f}`).join("\n")}`
  );
  process.exit(1);
}

console.log(
  `✓ All ${cases.length} rules verified (fires on invalid, silent on valid).`
);

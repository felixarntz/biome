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
  { needle: "Double assertions through", rule: "no-as-unknown-as" },
  {
    needle: "conditional object spreads",
    rule: "no-conditional-object-spread",
  },
  {
    needle: "reducer accumulator",
    rule: "no-empty-object-accumulator",
  },
  { needle: "hasOwnProperty()", rule: "no-has-own-property" },
  { needle: "prototype-chain property checks", rule: "no-in-operator" },
  {
    needle: "Object.assign({}, ...)",
    rule: "no-object-assign-target",
  },
  { needle: "Object.fromEntries()", rule: "no-object-from-entries" },
  { needle: "setPrototypeOf()", rule: "no-prototype-mutation" },
  {
    needle: "direct prototype access",
    rule: "no-prototype-property-access",
  },
  {
    ignored: "no-process-env-mutation.test.ts",
    needle: "mutating `process.env` directly",
    rule: "no-process-env-mutation",
  },
  {
    needle: "single object argument with named parameters",
    rule: "prefer-object-parameter",
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
    const { stdout: errorStdout } = error;
    stdout = errorStdout;
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

for (const { rule, needle, ignored } of cases) {
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

  if (ignored) {
    const ignoredMessages = pluginMessagesFor(ignored);
    if (ignoredMessages.length > 0) {
      failures.push(
        `${rule}: expected "${ignored}" to report no plugin diagnostics, but got: ${JSON.stringify(ignoredMessages)}`
      );
    }
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

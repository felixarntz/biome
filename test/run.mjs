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
  {
    ignored: [],
    needles: ["Double assertions through"],
    rule: "no-as-unknown-as",
  },
  {
    ignored: [],
    needles: ["conditional object spreads"],
    rule: "no-conditional-object-spread",
  },
  {
    ignored: [],
    needles: ["reducer accumulator"],
    rule: "no-empty-object-accumulator",
  },
  { ignored: [], needles: ["hasOwnProperty()"], rule: "no-has-own-property" },
  {
    ignored: [],
    needles: ["prototype-chain property checks"],
    rule: "no-in-operator",
  },
  {
    ignored: [],
    needles: [
      "Use `Object.create(null)` instead of `{}`",
      "Object.assign(Object.create(null), <objectWithDataToAssign>)",
    ],
    rule: "no-record-object-literal",
  },
  {
    ignored: [],
    needles: ["Object.assign({}, ...)"],
    rule: "no-object-assign-target",
  },
  {
    ignored: [],
    needles: ["Object.fromEntries()"],
    rule: "no-object-from-entries",
  },
  { ignored: [], needles: ["setPrototypeOf()"], rule: "no-prototype-mutation" },
  {
    ignored: [],
    needles: ["direct prototype access"],
    rule: "no-prototype-property-access",
  },
  {
    ignored: ["no-process-env-mutation.test.ts"],
    needles: ["mutating `process.env` directly"],
    rule: "no-process-env-mutation",
  },
  {
    ignored: [],
    needles: ["single object argument with named parameters"],
    rule: "require-object-parameter",
  },
  {
    ignored: [],
    needles: ["Do not include `null` or `undefined`"],
    rule: "require-optional-properties",
  },
  {
    ignored: [],
    needles: [
      "Name `AbortSignal` properties `abortSignal`",
      "Name `AbortController` properties `abortController`",
    ],
    rule: "require-explicit-abort-property-names",
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

for (const { rule, needles, ignored } of cases) {
  const invalid = `${rule}.invalid.ts`;
  const valid = `${rule}.valid.ts`;

  const invalidMessages = pluginMessagesFor(invalid);
  for (const expectedNeedle of needles) {
    if (!invalidMessages.some((m) => m.includes(expectedNeedle))) {
      failures.push(
        `${rule}: expected "${invalid}" to report a plugin diagnostic containing "${expectedNeedle}", ` +
          `but got: ${JSON.stringify(invalidMessages)}`
      );
    }
  }

  const validMessages = pluginMessagesFor(valid);
  if (validMessages.length > 0) {
    failures.push(
      `${rule}: expected "${valid}" to report no plugin diagnostics, but got: ${JSON.stringify(validMessages)}`
    );
  }

  for (const ignoredFixture of ignored) {
    const ignoredMessages = pluginMessagesFor(ignoredFixture);
    if (ignoredMessages.length > 0) {
      failures.push(
        `${rule}: expected "${ignoredFixture}" to report no plugin diagnostics, but got: ${JSON.stringify(ignoredMessages)}`
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

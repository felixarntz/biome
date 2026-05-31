---
name: add-new-rule
description: Add a new GritQL lint rule to the package. Use whenever the user asks to add, create, or write a new rule, lint check, or .grit plugin in this repo.
metadata:
  internal: true
---

# Add a new GritQL rule

You should already have relevant context covering the package structure, workflow commands (`pnpm build`/`test`/`typecheck`/`check`), and testing requirements. Quick recap:

- **Rule location:** Rules are [GritQL plugins](https://biomejs.dev/linter/plugins/) for [Biome](https://biomejs.dev), located in the `rules/` folder.
- **Test coverage:** Every rule needs exactly two fixtures: `test/fixtures/{rule}.valid.ts` (must produce no diagnostic) and `test/fixtures/{rule}.invalid.ts` (must trigger it). Register the rule in `test/run.mjs` with a stable substring of its message.

## Best Practices

- Run `ls rules` and read 2–3 existing `.grit` files before writing. Match their structure, naming, and diagnostic-message style (a concrete recommendation plus the reasoning behind it). `all.grit` is generated — never hand-edit it; run `pnpm build`.
- In the fixtures, cover alternative condition for the rule: A rule with no `or` usage (i.e. a single condition) needs 1 pass and 1 fail scenario, a rule with 2 `or` operands needs 2 pass and 2 fail scenarios, a rule with 3 `or` operands needs 3 pass and 3 fail scenarios, etc.

## Important: Update `README.md`

`README.md` lists the rules in more than one place. Update **all** of them, including the rules table, and the individual-rules code snippet (the `plugins` array).

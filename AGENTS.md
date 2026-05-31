# @felixarntz/biome - AGENTS.md

`@felixarntz/biome` is an NPM package with reusable [Biome](https://biomejs.dev) lint rules that make your agent produce better code in fewer review cycles, written as [GritQL plugins](https://biomejs.dev/linter/plugins/).

Projects can either include the GritQL plugins individually in their Biome config file, or they can reference `all.grit`, which bundles all plugins in one.

## External Consumer-facing Package Structure

- `rules/`: Contains each rule as a plugin file.
    - The exception is the `all.grit` file which gets auto-generated based on all the other plugin files.
- `types/`: Supplemental type declarations that help with certain rules.

## Workflow Commands

- `pnpm install` — install dependencies
- `pnpm build` — (re-)generate the `plugins/all.grit` file
- `pnpm typecheck` — run TypeScript type checking
- `pnpm test` — run fixture tests for each rule
- `pnpm check` — lint/format check via Ultracite
- `pnpm fix` — auto-fix lint/format issues

## Testing Requirements

Every new rule needs to be covered via two fixtures, one for the valid scenario, another one for the invalid scenario. These fixtures are placed in `test/fixtures/{rule}.valid.ts` and `test/fixtures/{rule}.invalid.ts`. The tests are orchestrated via the `test/run.mjs` script.

If a new type declaration is added, it needs to be covered by a type test in `test/types/{declaration}.test-d.ts`.

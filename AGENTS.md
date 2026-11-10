# @felixarntz/biome - AGENTS.md

`@felixarntz/biome` is an NPM package with reusable [Biome](https://biomejs.dev) lint rules that make your agent produce better code in fewer review cycles, written as [GritQL plugins](https://biomejs.dev/linter/plugins/).

Projects can include individual GritQL plugins, group bundles, or `all.grit` in their Biome config file.

## External Consumer-facing Package Structure

- `rules/<group>/`: Contains the individual rule plugins for a group.
- `rules/<group>.grit`: Generated bundle for that group. The folder name and the `.grit` file basename are identical.
- `rules/all.grit`: Generated bundle containing every rule.
- `types/`: Supplemental type declarations that help with certain rules.

## Workflow Commands

- `pnpm install` — install dependencies
- `pnpm build` — (re-)generate all group bundles and `rules/all.grit`
- `pnpm typecheck` — run TypeScript type checking
- `pnpm test` — run fixture tests for each rule
- `pnpm check` — lint/format check via Ultracite
- `pnpm fix` — auto-fix lint/format issues

## Testing Requirements

Every new rule needs to be covered via two fixtures, one for the valid scenario, another one for the invalid scenario. These fixtures are placed in `test/fixtures/{rule}.valid.ts` and `test/fixtures/{rule}.invalid.ts`. The tests are orchestrated via the `test/run.mjs` script.

If a new type declaration is added, it needs to be covered by a type test in `test/types/{declaration}.test-d.ts`.

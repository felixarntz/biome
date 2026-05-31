# Contributing to `@felixarntz/biome`

Thank you for your interest in contributing! We welcome bug reports, enhancement and feature suggestions, and code contributions.

## Opening issues

If you find a bug, please [open a bug report issue](https://github.com/felixarntz/biome/issues/new?template=1-bug.yml), and complete and submit the form.

## Suggesting Enhancements

If you have a suggestion for improving an existing feature, please [open an enhancement request issue](https://github.com/felixarntz/biome/issues/new?template=2-enhancement.yml), and complete and submit the form.

## Suggesting Features

Do you have an idea for an entirely new feature that might fit into the scope of the AI Code Agents SDK? Feature suggestions are welcome!

If your idea is mostly related to an existing feature, consider suggesting an enhancement instead (see above). But if your idea is something entirely new, please go ahead and [open a feature request issue](https://github.com/felixarntz/biome/issues/new?template=3-feature.yml), and complete and submit the form.

## Code Contributions

```sh
pnpm install
pnpm build     # regenerate rules/all.grit from rules/*.grit
pnpm test      # build, then assert each rule fires on invalid fixtures and is silent on valid ones
pnpm typecheck # type-check the Object.hasOwn augmentation and its narrowing test
pnpm check     # Biome lint + format on this repo
```

Each rule lives in its own file under `rules/`. `rules/all.grit` is **generated** by `scripts/generate-all.mjs`, so never edit it by hand. To add a rule, drop a new `<name>.grit` into `rules/`, add a matching pair of `test/fixtures/<name>.{invalid,valid}.ts` fixtures plus a case in `test/run.mjs`, then run `pnpm test`.

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include tests for new functionality
- Update documentation if needed
- Ensure all checks pass before requesting review
- Respond to feedback by the maintainer(s)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

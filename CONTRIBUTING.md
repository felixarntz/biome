# Contributing to `@felixarntz/biome`

Thank you for your interest in contributing! We welcome bug reports, enhancement and feature suggestions, and code contributions.

## Opening issues

- [Report a bug](https://github.com/felixarntz/biome/issues/new?template=1-bug.yml)
- [Suggest an enhancement](https://github.com/felixarntz/biome/issues/new?template=2-enhancement.yml)
- [Suggest a new feature](https://github.com/felixarntz/biome/issues/new?template=3-feature.yml)
- [Suggest documentation improvements](https://github.com/felixarntz/biome/issues/new?template=4-documentation.yml)
- [Ask a question](https://github.com/felixarntz/biome/issues/new?template=5-question.yml)

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

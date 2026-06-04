# @felixarntz/biome

Reusable [Biome](https://biomejs.dev) lint rules that make your agent produce better code in fewer review cycles, written as [GritQL plugins](https://biomejs.dev/linter/plugins/). Install the package once and reference the rules from any project's Biome config — either all of them with a single line, or individually as needed — without copying `.grit` files around.

## Rules

| Rule | What it flags |
| --- | --- |
| `no-as-unknown-as` | `value as unknown as T` double assertions, which bypass TypeScript's type checking entirely. |
| `no-in-operator` | The `in` operator, recommending `Object.hasOwn(obj, prop)` (which does not walk the prototype chain). |
| `prefer-object-parameter` | Functions, methods, and constructors with more than one positional parameter, recommending a single object argument with named parameters instead. A leading TypeScript `this` parameter is not counted. Inline callbacks, whose signature is dictated by the calling API, are left alone. |

## Installation

```sh
pnpm add -D @felixarntz/biome @biomejs/biome
```

## Usage

Biome plugins are enabled through the [`plugins`](https://biomejs.dev/reference/configuration/#plugins) array in your `biome.json`. **Biome does not resolve plugin entries as package names** — it only accepts file paths — so the rules are referenced by their path inside `node_modules`.

### All rules at once

The package ships a generated `rules/all.grit` that bundles every rule. Enable the whole set with a single entry:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/2.4.16/schema.json",
  "plugins": ["./node_modules/@felixarntz/biome/rules/all.grit"]
}
```

### Individual rules

Some of the rules are more opinionated than others. So if you don't want to use all of them, you can pick only the rules you want:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/2.4.16/schema.json",
  "plugins": [
    "./node_modules/@felixarntz/biome/rules/no-in-operator.grit",
    "./node_modules/@felixarntz/biome/rules/no-as-unknown-as.grit",
    "./node_modules/@felixarntz/biome/rules/prefer-object-parameter.grit"
  ]
}
```

> **Note on the path.** Plugin paths are resolved relative to the `biome.json` that declares them.
>
> The `./node_modules/...` form above assumes your config sits next to the `node_modules` that contains this package — the usual case for a single-package project, and for pnpm, whose symlink at `node_modules/@felixarntz/biome` resolves transparently. In a monorepo where the config and the installed package live in different directories, adjust the relative path accordingly (e.g. `../../node_modules/@felixarntz/biome/rules/all.grit`).
>
> This is a current Biome limitation: `extends` resolves npm packages, but `plugins` never does. Until Biome adds package resolution for plugins, the relative file path is the only way to reference them. Track progress in [biomejs/biome discussion #6265](https://github.com/biomejs/biome/discussions/6265).

## `Object.hasOwn` type augmentation

`no-in-operator` steers you toward `Object.hasOwn`, but the built-in TypeScript signature returns a plain `boolean` and therefore doesn't narrow the checked object. This package ships a type augmentation that restores narrowing parity with the `in` operator.

Enable it by importing it once from any `.ts`/`.d.ts` file that is part of your compilation:

```ts
import "@felixarntz/biome/object-hasown";
```

Or reference it from `tsconfig.json` (requires `"moduleResolution": "bundler"` or `"node16"`):

```jsonc
{
  "compilerOptions": {
    "types": ["@felixarntz/biome/object-hasown"]
  }
}
```

After that, `Object.hasOwn(obj, "key")` narrows `obj` the same way `"key" in obj` would.

## License

MIT

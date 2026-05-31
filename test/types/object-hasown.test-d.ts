/*
 * Type-level regression test for the `Object.hasOwn` augmentation in
 * types/object-hasown. It compiles ONLY when that augmentation narrows the
 * checked object: without it, `Object.hasOwn` returns a plain `boolean`, the
 * union below is never narrowed, and reading `value.label` in the positive
 * branch fails to compile. `pnpm typecheck` therefore breaks the moment the
 * declaration regresses. The augmentation is global (it merges into
 * `ObjectConstructor`), so being part of the same tsconfig program is enough —
 * no import is required here.
 */

type Tagged = { label: string } | { code: number };

export function describe(value: Tagged): string {
  if (Object.hasOwn(value, "label")) {
    return value.label;
  }

  return String(value.code);
}

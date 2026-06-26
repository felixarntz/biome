declare const entries: Iterable<[string, unknown]>;

export const map = new Map(entries);

export function toNullPrototypeRecord() {
  const result: Record<string, unknown> = Object.create(null);
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

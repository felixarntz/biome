declare const obj: Record<string, unknown>;
declare const key: string;
declare const list: unknown[];

export const hasDynamicKey = Object.hasOwn(obj, key);
export const hasConstructor = Object.hasOwn(obj, "constructor");
export const hasRestricted = "restricted" in obj;
export const hasType = "type" in obj;
export const hasFirstItem = 0 in list;

export class Branded {
  #brand = true;

  static is(value: object): value is Branded {
    return #brand in value;
  }
}

for (const objKey of Object.keys(obj)) {
  void objKey;
}

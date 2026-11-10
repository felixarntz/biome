declare const obj: Record<string, unknown>;
declare const key: string;

export const hasDynamicKey = key in obj;
export const hasConstructor = "constructor" in obj;
export const hasProto = "__proto__" in obj;
export const hasEscapedConstructor = "\u0063onstructor" in obj;

for (const objKey in obj) {
  void objKey;
}

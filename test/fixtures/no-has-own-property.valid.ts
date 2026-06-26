declare const obj: Record<string, unknown>;

export const hasKey = Object.hasOwn(obj, "key");
export const legacyHasKey = Object.prototype.hasOwnProperty.call(obj, "key");

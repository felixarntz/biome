declare const source: Record<string, unknown>;
declare const target: Record<string, unknown>;

export const merged = Object.assign(Object.create(null), source);
export const assigned = Object.assign(target, source);

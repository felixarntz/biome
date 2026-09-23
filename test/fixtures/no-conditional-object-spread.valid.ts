declare const includeName: boolean;
declare const includeValue: boolean;

const explicit: Record<string, unknown> = { id: 1 };
if (includeName) explicit.name = "Ada";

const optional = includeValue ? { value: 1 } : {};

export const assigned = { ...explicit };
export const precomputed = { id: 2, ...optional };
export const ordinary = { id: 3, ...{ value: 3 } };

declare const entries: string[];

export const counts = entries.reduce(
  (accumulator, entry) => accumulator,
  Object.create(null) as Record<string, number>,
);

export const grouped = entries.reduce((accumulator, entry) => accumulator, new Map<string, number>());

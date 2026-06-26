declare const entries: string[];

export const counts = entries.reduce((accumulator, entry) => accumulator, {});

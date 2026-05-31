type Cat = { meow: () => void };

declare const value: string;

export const cat = value as unknown as Cat;

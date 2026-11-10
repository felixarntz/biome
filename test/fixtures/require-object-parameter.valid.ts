export function add({ a, b }: { a: number; b: number }) {
  return a + b;
}

export function withThis(this: { name: string }, a: number) {
  return this.name + a;
}

/*
 * Callbacks whose signature is dictated by the API that invokes them must not be
 * flagged: switching them to a single object parameter is impossible because the
 * caller controls how arguments are passed. The same reasoning applies to
 * function-typed values, parameters, and inline function types, whose shape is
 * fixed by whoever calls them rather than by the author of this code.
 */
export const sum = [1, 2, 3].reduce((acc, value) => acc + value, 0);

export const product = new Promise<number>(function (resolve, reject) {
  resolve(1);
  return reject;
});

export const config = {
  format: (value: number, index: number) => `${index}: ${value}`,
};

export type Handlers = {
  onChange: (previous: number, next: number) => void;
};

export interface Callable {
  (first: number, second: number): number;
}

export class Widget {
  onResize = (width: number, height: number) => width * height;
}

export function register(listener: (event: string, data: string) => void) {
  return listener;
}

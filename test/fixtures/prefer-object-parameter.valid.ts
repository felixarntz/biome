export function add({ a, b }: { a: number; b: number }) {
  return a + b;
}

export function withThis(this: { name: string }, a: number) {
  return this.name + a;
}

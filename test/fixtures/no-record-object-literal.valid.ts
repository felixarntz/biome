type SomeType = { value: string };

const empty: Record<string, SomeType> = Object.create(null);
const populated: Record<string, SomeType> = Object.assign(
  Object.create(null),
  {
    existing: { value: "data" },
  }
);
const ordinaryObject: SomeType = {};
const numberKeyed: Record<number, SomeType> = {};

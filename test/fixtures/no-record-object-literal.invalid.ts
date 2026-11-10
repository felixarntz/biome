type SomeType = { value: string };

const empty: Record<string, SomeType> = {};
const populated: Record<string, SomeType> = {
  existing: { value: "data" },
  another: { value: "value" },
};

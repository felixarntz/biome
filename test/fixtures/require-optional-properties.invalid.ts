type NullableProperty = {
  someField: string | null;
};

type UndefinedProperty = {
  someField: string | undefined;
};

type ReversedNullableProperty = {
  someField: null | string;
};

type ExtendedNullableUnion = {
  someField: string | number | null;
};

interface InterfaceProperty {
  someField: undefined | string;
}

type OptionalNullishProperties = {
  code?: number | null;
  label?: string | undefined;
};

type FunctionPropertyWithOptionalParameter = {
  callback: (input?: string) => number | null;
};

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

type FunctionPropertyWithOptionalParameter = {
  callback: (input?: string) => number | null;
};

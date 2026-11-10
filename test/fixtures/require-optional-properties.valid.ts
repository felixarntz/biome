type AlreadyOptional = {
  someField?: string | null;
  anotherField?: string | undefined;
};

type NonNullishUnion = {
  someField: string | number;
};

interface RequiredProperty {
  someField: string;
}

const objectValue = {
  someField: true || null,
};

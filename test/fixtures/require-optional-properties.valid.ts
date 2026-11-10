type AlreadyOptional = {
  someField?: string;
  anotherField?: string;
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

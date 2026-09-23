declare const omitName: boolean;
declare const includeValue: boolean;

export const omitted = {
  id: 1,
  ...(omitName ? {} : { name: "Ada" }),
};

export const included = {
  id: 2,
  ...(includeValue ? { value: 1 } : {}),
};

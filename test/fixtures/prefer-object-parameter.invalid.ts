const fakeFilesystem: Record<string, string> = {};

export function writeFile(file: string, content: string) {
  fakeFilesystem[file] = content;
}

export function writeFileOn(
  this: Record<string, string>,
  file: string,
  content: string
) {
  this[file] = content;
}

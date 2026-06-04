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

export const createUser = (name: string, email: string) => ({ name, email });

export const renameUser = function (id: string, name: string) {
  return { id, name };
};

export class Repository {
  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  host: string;
  port: number;

  connect(user: string, password: string) {
    return `${user}@${this.host}:${this.port}`;
  }
}

export const validator = {
  check(value: string, pattern: RegExp) {
    return pattern.test(value);
  },
};

export declare function legacyApi(id: string, payload: string): void;

export interface Service {
  send(topic: string, body: string): void;
  new (host: string, port: number): Service;
}

export abstract class Base {
  abstract handle(input: string, retries: number): void;
}

export type Reducer = (accumulator: number, current: number) => number;

export type Factory = new (id: string, label: string) => Repository;

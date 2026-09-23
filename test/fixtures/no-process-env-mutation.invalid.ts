declare const key: string;
declare const process: { env: Record<string, string | undefined> };
declare const values: Record<string, string | undefined>;

process.env.NODE_ENV = "test";
process.env[key] = "test";
process.env.DEBUG ||= "test";
process.env = values;
delete process.env.DEBUG;
delete process.env[key];
Object.assign(process.env, values);

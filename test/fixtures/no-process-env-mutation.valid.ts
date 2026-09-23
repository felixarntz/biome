declare const key: string;
declare const process: { env: Readonly<Record<string, string | undefined>> };
declare const values: Record<string, string | undefined>;

export const mode = process.env.NODE_ENV;
export const keyedMode = process.env[key];
export const childEnv = { ...process.env, NODE_ENV: "test", ...values };

const localEnv: Record<string, string | undefined> = {};
localEnv.NODE_ENV = "test";
localEnv[key] = "test";
delete localEnv.DEBUG;
delete localEnv[key];
Object.assign(localEnv, values);

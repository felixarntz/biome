declare const obj: Record<string, unknown>;

export const proto = obj.__proto__;
export const constructorPrototype = obj.constructor.prototype;

declare const obj: Record<string, unknown>;

export const hasKey = "key" in obj;

for (const key in obj) {
  void key;
}

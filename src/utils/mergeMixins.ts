type ConflictStrategy = "first" | "last";

type Constructor<T = any> = new (...args: any[]) => T;

// Helper to detect plain objects
function isPlainObject(obj: any): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null && obj.constructor === Object;
}

// Deep merge function
function deepMerge(target: any, source: any): any {
  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target, ...source]; // concat arrays
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    const result: Record<string, any> = { ...target };
    for (const key of Object.keys(source)) {
      if (key in target) {
        result[key] = deepMerge(target[key], source[key]); // recursive merge
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  // fallback: source overrides target
  return source;
}

export function mergeMixins<T extends Constructor[]>(
  strategy: ConflictStrategy,
  ...bases: T
) {
  class Base {}
  return bases.reduce((acc, NextBase) => {
    return class Mixed extends (acc as any) {
      constructor(...args: any[]) {
        super(...args);
        const instance = new (NextBase as any)(...args);

        // Deep merge data
        for (const key of Object.keys(instance)) {
          const existing = (this as any)[key];
          const incoming = instance[key];
          if (isPlainObject(existing) && isPlainObject(incoming)) {
            (this as any)[key] = deepMerge(existing, incoming);
          } else {
            (this as any)[key] = incoming ?? existing;
          }
        }

        // Merge methods based on strategy
        const proto = Object.getPrototypeOf(instance);
        for (const key of Object.getOwnPropertyNames(proto)) {
          if (key === "constructor") continue;
          const hasKey = key in this;
          const descriptor = Object.getOwnPropertyDescriptor(proto, key)!;

          if (strategy === "last" || !hasKey) {
            Object.defineProperty(this, key, descriptor);
          }
        }
      }
    };
  }, Base);
}

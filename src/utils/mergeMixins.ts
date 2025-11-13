type Constructor<T = {}> = new (...args: any[]) => T;

// Deep merge helper
function deepMerge(target: any, source: any): any {
  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target, ...source];
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    const result: Record<string, any> = { ...target };
    for (const key of Object.keys(source)) {
      if (key in target) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  // fallback: source overrides target
  return source;
}

function isPlainObject(obj: any): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null && obj.constructor === Object;
}

// Merge multiple classes (A, B, C, ...)
export function mergeMixins<T extends Constructor[]>(...bases: T) {
  class Base {}

  return bases.reduce((acc, NextBase) => {
    return class Mixed extends (acc as any) {
      constructor(...args: any[]) {
        super(...args);

        const instance = new (NextBase as any)(...args);

        // Merge instance fields deeply
        for (const key of Object.keys(instance)) {
          const existing = (this as any)[key];
          const incoming = instance[key];
          if (isPlainObject(existing) && isPlainObject(incoming)) {
            (this as any)[key] = deepMerge(existing, incoming);
          } else {
            (this as any)[key] = incoming ?? existing;
          }
        }

        // Merge prototype methods (but don't overwrite existing)
        const proto = Object.getPrototypeOf(instance);
        for (const key of Object.getOwnPropertyNames(proto)) {
          if (key === "constructor") continue;
          if (!(key in this)) {
            Object.defineProperty(
              this,
              key,
              Object.getOwnPropertyDescriptor(proto, key)!
            );
          }
        }
      }
    };
  }, Base);
}

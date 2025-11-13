type Constructor<T = {}> = new (...args: any[]) => T;

function isPlainObject(obj: any): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null && obj.constructor === Object;
}

function deepMerge(target: any, source: any): any {
  if (Array.isArray(target) && Array.isArray(source)) return [...target, ...source];
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
  return source;
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

export type FunctionMergeStrategy = "chain" | "first" | "last";

export function mergeWithStrategy<T extends Constructor[]>(
  strategy: FunctionMergeStrategy,
  ...bases: T
) {
  class Base {}
  let MixedClass: Constructor = Base;

  for (const NextBase of bases) {
    const Prev = MixedClass;
    MixedClass = class extends Prev {
      constructor(...args: any[]) {
        super(...args);
        const instance = new NextBase(...args);

        // Merge instance properties
        for (const key of Object.keys(instance)) {
          const existing = (this as any)[key];
          const incoming = instance[key];
          if (isPlainObject(existing) && isPlainObject(incoming)) {
            (this as any)[key] = deepMerge(existing, incoming);
          } else {
            (this as any)[key] = incoming ?? existing;
          }
        }

        // Merge prototype methods
        const proto = Object.getPrototypeOf(instance);
        for (const key of Object.getOwnPropertyNames(proto)) {
          if (key === "constructor") continue;
          const descriptor = Object.getOwnPropertyDescriptor(proto, key)!;
          const hasKey = key in this;

          if (typeof descriptor.value === "function") {
            if (strategy === "first" && !hasKey) {
              Object.defineProperty(this, key, descriptor);
            } else if (strategy === "last") {
              Object.defineProperty(this, key, descriptor);
            } else if (strategy === "chain" && hasKey && typeof this[key] === "function") {
              const oldFn = this[key].bind(this);
              const newFn = descriptor.value.bind(this);
              this[key] = (...args: any[]) => {
                oldFn(...args);
                return newFn(...args);
              };
            } else if (!hasKey) {
              Object.defineProperty(this, key, descriptor);
            }
          }
        }
      }
    };
  }

  return MixedClass;
}
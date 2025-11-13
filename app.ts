import { mergeMixins, mergeWithStrategy } from "./src/utils/mergeMixins";

class A {
  config = { a: 1 };
  sayA() { console.log("A"); }
  greet() { console.log("Hello from A"); }
}

class B {
  config = { b: 2, nested: { x: 1 } };
  sayB() { console.log("B"); }
  greet() { console.log("Hello from B"); }
}

class C {
  config = { c: 3, nested: { y: 2 } };
  sayC() { console.log("C"); }
  greet() { console.log("Hello from C"); }
}

const MixedFirst = mergeWithStrategy("chain", A, B, C);

const m = new MixedFirst();
console.log(m);
// ✅ { a: 1, b: 2, c: 3, nested: { x: 1, y: 2 } }

m.sayA(); // "A"
m.sayB(); // "B"
m.sayC(); // "C"
m.greet();


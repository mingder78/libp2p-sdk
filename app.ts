import { mergeMixins } from "./src/utils/mergeMixins";

class A {
  config = { a: 1 };
  sayA() { console.log("A"); }
}

class B {
  config = { b: 2, nested: { x: 1 } };
  sayB() { console.log("B"); }
}

class C {
  config = { c: 3, nested: { y: 2 } };
  sayC() { console.log("C"); }
}

const Mixed = mergeMixins(A, B, C);
const m = new Mixed();

console.log(m);
// ✅ { a: 1, b: 2, c: 3, nested: { x: 1, y: 2 } }

m.sayA(); // "A"
m.sayB(); // "B"
m.sayC(); // "C"


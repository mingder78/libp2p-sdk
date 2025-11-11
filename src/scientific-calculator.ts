import { Calculator } from "./calculator";

// Subclass extends the base Calculator
export class ScientificCalculator extends Calculator {
  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  sqrt(value: number): number {
    if (value < 0) throw new Error("Cannot take square root of negative number");
    return Math.sqrt(value);
  }

  // override multiply to show polymorphism example
  override multiply(a: number, b: number): number {
    console.log("Using ScientificCalculator multiply method");
    return super.multiply(a, b);
  }
}

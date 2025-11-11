import { describe, it, expect, vi } from "vitest";
import { ScientificCalculator } from "../src";

describe("ScientificCalculator", () => {
  const calc = new ScientificCalculator();

  it("inherits basic operations", () => {
    expect(calc.add(2, 3)).toBe(5);
    expect(calc.subtract(5, 3)).toBe(2);
  });

  it("can calculate power and square root", () => {
    expect(calc.power(2, 3)).toBe(8);
    expect(calc.sqrt(9)).toBe(3);
  });

  it("throws error for invalid sqrt input", () => {
    expect(() => calc.sqrt(-1)).toThrow("Cannot take square root of negative number");
  });

  it("overrides multiply with custom behavior", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(calc.multiply(2, 3)).toBe(6);
    expect(logSpy).toHaveBeenCalledWith("Using ScientificCalculator multiply method");
    logSpy.mockRestore();
  });
});

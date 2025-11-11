// src/calculator.ts
import type { CalculatorOptions, CalculationResult } from '../types/calculator.d.ts';

/**
 * A robust Calculator class with support for basic operations
 * and operation history tracking.
 */
export class Calculator {
  private history: CalculationResult[] = [];

  constructor(private options: CalculatorOptions = { precision: 2 }) {}

  /** Adds two numbers */
  add(a: number, b: number): number {
    const result = a + b;
    this.record('add', a, b, result);
    return this.round(result);
  }

  /** Subtracts b from a */
  subtract(a: number, b: number): number {
    const result = a - b;
    this.record('subtract', a, b, result);
    return this.round(result);
  }

  /** Multiplies two numbers */
  multiply(a: number, b: number): number {
    const result = a * b;
    this.record('multiply', a, b, result);
    return this.round(result);
  }

  /** Divides a by b (with division by zero protection) */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    const result = a / b;
    this.record('divide', a, b, result);
    return this.round(result);
  }

  /** Returns a copy of the calculation history */
  getHistory(): CalculationResult[] {
    return [...this.history];
  }

  /** Clears the calculation history */
  clearHistory(): void {
    this.history = [];
  }

  /** Rounds number based on precision setting */
  private round(value: number): number {
    const multiplier = Math.pow(10, this.options.precision);
    return Math.round(value * multiplier) / multiplier;
  }

  /** Records a calculation in history */
  private record(
    operation: string,
    a: number,
    b: number,
    result: number
  ): void {
    this.history.push({
      operation: operation as CalculationResult['operation'],
      operands: [a, b],
      result,
      timestamp: new Date().toISOString(),
    });
  }
}
// src/types/calculator.d.ts
export interface CalculatorOptions {
  /** Decimal precision for rounding results (default: 2) */
  precision: number;
}

export interface CalculationResult {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  operands: [number, number];
  result: number;
  timestamp: string;
}
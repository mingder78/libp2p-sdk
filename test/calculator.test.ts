// src/calculator.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../src';

describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator({ precision: 2 });
    calc.clearHistory();
  });

  it('should add numbers correctly', () => {
    expect(calc.add(2.5, 3)).toBe(5.5);
    expect(calc.add(-1, 1)).toBe(0);
  });

  it('should subtract correctly', () => {
    expect(calc.subtract(5, 3)).toBe(2);
    expect(calc.subtract(0, 5)).toBe(-5);
  });

  it('should multiply correctly', () => {
    expect(calc.multiply(2.5, 4)).toBe(10);
    expect(calc.multiply(-2, 3)).toBe(-6);
  });

  it('should divide correctly and handle decimals', () => {
    expect(calc.divide(5, 2)).toBe(2.5);
    expect(calc.divide(1, 3)).toBe(0.33);
    expect(calc.divide(10, 4)).toBe(2.5);
  });

  it('should throw error when dividing by zero', () => {
    expect(() => calc.divide(1, 0)).toThrow('Division by zero');
    expect(() => calc.divide(-10, 0)).toThrow('Division by zero');
  });

  it('should record calculation history', () => {
    calc.add(1, 2);
    calc.multiply(3, 4);

    const history = calc.getHistory();
    expect(history).toHaveLength(2);
    expect(history[0]).toMatchObject({
      operation: 'add',
      operands: [1, 2],
      result: 3,
    });
    expect((history?.[1] as any)?.operation).toBe('multiply');
    expect((history?.[1] as any)?.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('should support custom precision', () => {
    const calcHigh = new Calculator({ precision: 4 });
    expect(calcHigh.divide(1, 3)).toBe(0.3333);
    
    const calcLow = new Calculator({ precision: 0 });
    expect(calcLow.add(1.7, 2.3)).toBe(4);
  });

  it('should clear history properly', () => {
    calc.add(1, 1);
    expect(calc.getHistory()).toHaveLength(1);
    calc.clearHistory();
    expect(calc.getHistory()).toHaveLength(0);
  });
});
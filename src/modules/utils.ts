export function peerIdIs(name: string): string {
  return `PeerId is ${name}`;
}

// Example entrypoint for programmatic use
export async function main(args: string[]) {
  const name = args[0] ?? "World";
  console.log(peerIdIs(name));
}

/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */
export function sqrt(x: number): number {
    return Math.sqrt(x);
}

export function calculateScore(heightReached: number): number {
  if (heightReached <= 0) {
    return 0;
  }
  return Math.floor(heightReached);
}

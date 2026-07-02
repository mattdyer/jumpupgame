export function applyPowerupEffect(currentJumpStrength: number, type: string): number {
  if (type === 'spring') {
    return currentJumpStrength * 2;
  }
  return currentJumpStrength;
}

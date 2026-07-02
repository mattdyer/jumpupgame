import { describe, it, expect } from 'vitest';
import { applyJumpImpulse } from '../src/core/physics';

describe('Player Jumping', () => {
  it('should apply jump impulse to velocity', () => {
    const velocity = 0;
    const jumpStrength = -10;
    const newVelocity = applyJumpImpulse(velocity, jumpStrength);
    expect(newVelocity).toBe(-10);
  });

  it('should correctly combine jump impulse with existing upward velocity', () => {
    const velocity = -5; 
    const jumpStrength = -10;
    const newVelocity = applyJumpImpulse(velocity, jumpStrength);
    expect(newVelocity).toBe(-15);
  });
});

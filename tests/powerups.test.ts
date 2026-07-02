import { describe, it, expect } from 'vitest';
import { applyPowerupEffect } from '../src/entities/powerups';

describe('Powerup System', () => {
  it('should increase jump strength when spring powerup is collected', () => {
    const currentJumpStrength = 10;
    const newJumpStrength = applyPowerupEffect(currentJumpStrength, 'spring');
    expect(newJumpStrength).toBe(20); 
  });

  it('should not change jump strength for other powerups', () => {
    const currentJumpStrength = 10;
    const newJumpStrength = applyPowerupEffect(currentJumpStrength, 'shield');
    expect(newJumpStrength).toBe(10);
  });
});
